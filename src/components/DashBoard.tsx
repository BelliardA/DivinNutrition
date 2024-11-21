import User from "../objects/User";
import useUserStore from "../store/User";
import useFetch from "../hook/useFetch";
import { useEffect, useState } from "react";
import Week from "../objects/Week";
import useMealStore from "../store/MealPlan";
import CardMeal from "./CardMeal";
import "./Dashboard.css"
function DashBoard() {
  const { user } = useUserStore();
  const newWeek = new Week(1);
  const {week, setWeek} = useMealStore();
  const [isSetWeek, setIsSetWeek ] = useState(false);

  const newUser = new User(
    user._name,
    user._age,
    user._weight,
    user._height,
    user._activity,
    user._sexe,
    user._activityPro
  );

  const {
    data: dataBreakFast,
    isLoading: isLoadingBreakFast,
    error: errorBreakFast,
  } = useFetch(newUser.createUrlBreakFast());
  const {
    data: dataLunch,
    isLoading: isLoadingLunch,
    error: errorLunch,
  } = useFetch(newUser.createUrlLunch());
  const {
    data: dataDinner,
    isLoading: isLoadingDinner,
    error: errorDinner,
  } = useFetch(newUser.createUrlDinner());

 

  useEffect(() => {
    if (dataBreakFast && dataLunch && dataDinner && !isSetWeek) {
      Object.entries(newWeek.days).forEach(([dayName, dayObject], index) => {
        console.log(`Jour : ${dayName}`);
        dayObject.breakfast = (dataBreakFast as any).hits[index];
        console.log(`Breakfast :`, dayObject.breakfast);
        dayObject.lunch = (dataLunch as any).hits[index];
        console.log(`Lunch :`, dayObject.lunch);
        dayObject.dinner = (dataDinner as any).hits[index];
        console.log(`Dinner :`, dayObject.dinner);
      });
      setWeek(newWeek)
    }
    setIsSetWeek(false)
    
  }, [dataBreakFast && dataLunch && dataDinner]);

  const storedWeekData = week?.days;

  return (
    <main className="mainDashboard">
      {storedWeekData &&
        Object.entries(storedWeekData).map(([dayName, dayObject]) => (
          <div key={dayName}>
            <h2>{dayName}</h2>
            <div className="daily">
              {/* Petit déjeuner */}
              {dayObject.breakfast && <CardMeal data={dayObject.breakfast} />}
              {/* Déjeuner */}
              {dayObject.lunch && <CardMeal data={dayObject.lunch} />}
              {/* Dîner */}
              {dayObject.dinner && <CardMeal data={dayObject.dinner} />}
            </div>
          </div>
        ))}
    </main>
  );
}

export default DashBoard;
