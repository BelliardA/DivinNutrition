import "./../style/Dashboard.css";

import User from "../objects/User";
import { DaysOfWeek, MealType } from "../objects/Constants";

import useUserStore from "../store/User";
import useFetch from "../hook/useFetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Plus} from "lucide-react";


import Chart from "./Chart";
import ButtonWeight from "./ButtonWeight";
import CardMeal from "./CardMeal";
import IsFetch from "../store/IsFetch";
import Liste from "./Liste";
import Water from "./Water";

interface DashBoardProps {
  currentWeek: number;
}
interface Macronutrient {
  protein: number;
  glucides: number;
  lipids: number;
}

function getCurrentMeal(){
  const currentHour = new Date().getHours();

  if (currentHour >= 10 && currentHour < 15) {
    return ["Déjeuner", MealType.Lunch];
  } else if (currentHour >= 15 && currentHour < 23) {
    return ["Dîner", MealType.Dinner];
  } else {
    return ["Petit-déjeuner", MealType.Breakfast];
  }
}

function getCurrentDayName(): string {
  const currentDayIndex = new Date().getDay();  // Obtient l'index du jour (0 pour Dimanche, etc.)
  const dayNames = [
    DaysOfWeek.Sunday,
    DaysOfWeek.Monday,
    DaysOfWeek.Tuesday,
    DaysOfWeek.Wednesday,
    DaysOfWeek.Thursday,
    DaysOfWeek.Friday,
    DaysOfWeek.Saturday,
  ];

  return dayNames[currentDayIndex];
}


function DashBoard({
  currentWeek,
}: DashBoardProps){

  const [macroNutrient, setMacroNutrient] = useState<Macronutrient>();
  const [caloriesPerDay, setCaloriesPerDay] = useState<number>(0);
  const [totalWater, setTotalWater] = useState<number>(0);
  const { user, updateUser } = useUserStore();
  const navigate = useNavigate();
  const {isFetch} = IsFetch();

  const newUser = new User({
    name: user._name,
    age: user._age,
    weight: user._weight,
    height: user._height,
    activity: user._activity,
    sexe: user._sexe,
    activityPro: user._activityPro,
  });

  if(isFetch){ //mettre !isFetch dans le cas ou l'api est fonctionnel
    useFetch(newUser.createUrlBreakFast(), currentWeek, MealType.Breakfast);
    useFetch(newUser.createUrlLunch(), currentWeek, MealType.Lunch);
    useFetch(newUser.createUrlDinner(), currentWeek, MealType.Dinner);
  }

  useEffect(() => {
    setCaloriesPerDay(newUser.calculateCalories());
    setMacroNutrient(newUser.nessesaryMacroNutr());
 }, [user._weight]);

 const navigateToMealPlan = () => {
    navigate("/meal-plan");
  }
  const searchAliment = () => {
    navigate("/search-aliment");
  }

  return (
  <main className="mainDashboard">
    <section className="stat">
      <h1>Bonjour {newUser._name }</h1>
      {macroNutrient && 
      <Chart lipids={macroNutrient.lipids} glucides={macroNutrient.glucides} proteins={macroNutrient.protein} caloriesPerDay={caloriesPerDay}/>
      }
      <ButtonWeight user={newUser} updateUser={updateUser}/>
    </section>
    <section className="meal"> 
      <div className="title-meal">
        <h2>{getCurrentMeal()[0]}</h2>
        <button className="btn-navig" onClick={navigateToMealPlan}><CalendarDays size={40} /></button>
      </div>
      <CardMeal mealType={getCurrentMeal()[1]} dayName={getCurrentDayName()}/>
    </section>
    <section className="en-cas">
      <h2>En-cas</h2>
      <Liste/>
      <button className="btn-ajouter-dashboard" onClick={searchAliment}>
        <Plus size={36} color="#000000" />
        <h3>Ajouter</h3>
      </button>
    </section>
    <section className="water">
      <h2>Consommation d'eau</h2>
      <p>
      Votre consommation d'eau est de{" "}
        {totalWater >= 100 ? `${(totalWater / 100).toFixed(2)} L` : `${totalWater} cl`}
      </p>
      <Water totalWater={totalWater} setTotalWater={setTotalWater}/>
    </section>
  </main>);
}

export default DashBoard;
