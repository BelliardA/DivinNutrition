import "./../style/Dashboard.css";

import User from "../objects/User";
import { DaysOfWeek, MealType } from "../objects/Constants";

import useUserStore from "../store/User";
import useFetch from "../hook/useFetch";
import { useEffect, useState } from "react";

import Chart from "./Chart";
import ButtonWeight from "./ButtonWeight";
import CardMeal from "./CardMeal";


interface DashBoardProps {
  currentWeek: number;
  isWeekAlreadyFetched: boolean;
  setIsWeekAlreadyFetched: (state: boolean) => void;
}
interface Macronutrient {
  protein: number;
  glucides: number;
  lipids: number;
}

function DashBoard({
  currentWeek,
  isWeekAlreadyFetched,
  setIsWeekAlreadyFetched,
}: DashBoardProps){

  const [macroNutrient, setMacroNutrient] = useState<Macronutrient>();
  const [caloriesPerDay, setCaloriesPerDay] = useState<number>(0);
  const { user, updateUser } = useUserStore();
  

  const newUser = new User(user);
   // Déplacer les hooks useFetch en dehors de la condition
if(!isWeekAlreadyFetched){
    useFetch(newUser.createUrlBreakFast(), currentWeek, MealType.Breakfast);
    useFetch(newUser.createUrlLunch(), currentWeek, MealType.Lunch);
    useFetch(newUser.createUrlDinner(), currentWeek, MealType.Dinner);

   setIsWeekAlreadyFetched(true);
}


   useEffect(() => {
      setMacroNutrient(newUser.nessesaryMacroNutr());
      setCaloriesPerDay(newUser.calculateCalories());
   }, [updateUser]);

  return (
  <main className="mainDashboard">
    <section className="stat">
      {macroNutrient && 
      <Chart lipids={macroNutrient.lipids} glucides={macroNutrient.glucides} proteins={macroNutrient.protein} caloriesPerDay={caloriesPerDay}/>
      }
      <ButtonWeight user={user} updateUser={updateUser}/>
    </section>
    <section className="meal"> 
      <CardMeal mealType={MealType.Breakfast} dayName={DaysOfWeek.Monday}/>
    </section>
  </main>);
}

export default DashBoard;
