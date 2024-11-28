import "./../style/Dashboard.css";
import moment from "moment";

import User from "../objects/User";
import Week from "../objects/Week";

import useUserStore from "../store/User";
import useMealStore from "../store/MealPlan";
import useFetch from "../hook/useFetch";
import { useEffect, useState } from "react";

import Chart from "./Chart";
import ButtonWeight from "./ButtonWeight";
import CardMeal from "./CardMeal";

// Fonction pour obtenir la date du lundi de la semaine
function getMondayOfWeek(weekNumber: number, year: number): Date {
  return moment().year(year).week(weekNumber).startOf("isoWeek").toDate();
}

interface DashBoardProps {
  currentWeek: number;
  isWeekAlreadyFetched: boolean;
  setIsWeekAlreadyFetched: (state: boolean) => void;
}

function DashBoard({
  currentWeek,
  isWeekAlreadyFetched,
  setIsWeekAlreadyFetched,
}: DashBoardProps){
  const newWeek = new Week(currentWeek);
  const { week, setWeek } = useMealStore();
  const [isSetWeek, setIsSetWeek] = useState(false);
  const { user, updateUser } = useUserStore();

  const newUser = new User(
    user._name,
    user._age,
    user._weight,
    user._height,
    user._activity,
    user._sexe,
    user._activityPro
  );

  console.log(newUser)

   // Déplacer les hooks useFetch en dehors de la condition
   const { data: dataBreakFast, isLoading: isLoadingBreakFast, error: errorBreakFast } = useFetch(newUser.createUrlBreakFast());
   const { data: dataLunch, isLoading: isLoadingLunch, error: errorLunch } = useFetch(newUser.createUrlLunch());
   const { data: dataDinner, isLoading: isLoadingDinner, error: errorDinner } = useFetch(newUser.createUrlDinner());
 
   useEffect(() => {
     if (!isWeekAlreadyFetched && dataBreakFast && dataLunch && dataDinner && !isSetWeek) {
       console.log("fetching data");
 
       const currentYear = new Date().getFullYear();
       const mondayDate = getMondayOfWeek(currentWeek, currentYear);
 
       Object.entries(newWeek.days).forEach(([dayName, dayObject], index) => {
         const dayDate = new Date(mondayDate);
         dayDate.setDate(mondayDate.getDate() + index);
 
         dayObject.date = moment(dayDate).format("DD/MM/YYYY");
         dayObject.breakfast = (dataBreakFast as any).hits[index];
         dayObject.lunch = (dataLunch as any).hits[index];
         dayObject.dinner = (dataDinner as any).hits[index];
       });
 
       setWeek(newWeek);
       setIsSetWeek(true);
       setIsWeekAlreadyFetched(true);
     }
   }, [currentWeek, isWeekAlreadyFetched, dataBreakFast, dataLunch, dataDinner]);  


  const macroNutrient = newUser.nessesaryMacroNutr();
  const caloriesPerDay = newUser.calculateCalories();
  return (
  <main className="mainDashboard">
    <Chart lipids={macroNutrient.lipids} glucides={macroNutrient.glucides} proteins={macroNutrient.protein} caloriesPerDay={caloriesPerDay}/>
    <ButtonWeight user={user} updateUser={updateUser}/>
    <CardMeal data={week._days.monday._breakfast} />
  </main>);
}

export default DashBoard;
