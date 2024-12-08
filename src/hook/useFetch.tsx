import { useState, useEffect } from "react";
import useMealStore from "../store/MealPlan";
import Week from "../objects/Week";

import StateUseFecth from "../store/StateUseFetch";
import { MealType } from "../objects/Constants";

import moment from "moment";
import IsFetch from "../store/IsFetch";

export function getMondayOfWeek(weekNumber: number, year: number): Date {
  return moment().year(year).week(weekNumber).startOf("isoWeek").toDate();
}

const useFetch = (url: string, currentWeek: number, type: MealType) => {
  const [data, setData] = useState(null);

  const newWeek = new Week(currentWeek);
  const { updateMeal } = useMealStore();
  const {setIsFetch} = IsFetch();

  const FetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw Error("could not fetch the data for that resource");
      }
      const data = await response.json();
      console.log("ok");
      setData(data);
      setIsFetch(true);

      const mondayDate = getMondayOfWeek(currentWeek, new Date().getFullYear());

      Object.entries(newWeek.days).forEach(([dayName, dayObject], index) => {
        const dayDate = new Date(mondayDate);
        dayDate.setDate(mondayDate.getDate() + index);

        dayObject.date = moment(dayDate).format("DD/MM/YYYY");
        let tmpData = data.hits[index];
        console.log(dayName, type, tmpData);
        updateMeal(dayName, type, tmpData);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  FetchData();
};

export default useFetch;
