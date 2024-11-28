import User from "../objects/User";
import useUserStore from "../store/User";
import useFetch from "../hook/useFetch";
import { useEffect, useState } from "react";
import Week from "../objects/Week";
import useMealStore from "../store/MealPlan";
import CardMeal from "./CardMeal";
import "./../style/Dashboard.css"
import moment from 'moment';

// Fonction pour obtenir la date du lundi de la semaine
function getMondayOfWeek(weekNumber: number, year: number): Date {
  return moment().year(year).week(weekNumber).startOf('isoWeek').toDate();
}

function DashBoard(currentWeek: any, currentDate: any) {
  const { user } = useUserStore();
  const newWeek = new Week(currentWeek);
  const { week, setWeek } = useMealStore();
  const [isSetWeek, setIsSetWeek] = useState(false);

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
      const currentYear = new Date().getFullYear();
      const mondayDate = getMondayOfWeek(currentWeek, currentYear); 

      Object.entries(newWeek.days).forEach(([dayName, dayObject], index) => {
        const dayDate = new Date(mondayDate);
        dayDate.setDate(mondayDate.getDate() + index);
        
        dayObject.date = moment(dayDate).format('DD/MM/YYYY');
        console.log(dayObject.date);
        dayObject.breakfast = (dataBreakFast as any).hits[index];
        dayObject.lunch = (dataLunch as any).hits[index];
        dayObject.dinner = (dataDinner as any).hits[index];
      });
      console.log(newWeek);
      setWeek(newWeek);
      setIsSetWeek(true);
    }
  }, [dataBreakFast, dataLunch, dataDinner]);

  const storedWeekData = week?.days;

  return (
    <main className="mainDashboard">
      {storedWeekData &&
        Object.entries(storedWeekData).map(([dayName, dayObject]) => (
          <div key={dayName}>
            <h2>{dayName}</h2>
            <div className="daily">
              {dayObject.breakfast && <CardMeal data={dayObject.breakfast} />}
              {dayObject.lunch && <CardMeal data={dayObject.lunch} />}
              {dayObject.dinner && <CardMeal data={dayObject.dinner} />}
            </div>
          </div>
        ))}
    </main>
  );
}

export default DashBoard;