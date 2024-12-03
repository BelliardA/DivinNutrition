import { useState, useEffect } from 'react';
import useMealStore from '../store/MealPlan';
import Week from '../objects/Week';

import StateUseFecth from '../store/StateUseFetch';
import { MealType } from '../objects/Constants';

import moment from "moment";

function getMondayOfWeek(weekNumber: number, year: number): Date {
  return moment().year(year).week(weekNumber).startOf("isoWeek").toDate();
}

const useFetch = (url : string, currentWeek : number, type : MealType) => {
  const [data, setData] = useState(null);
  const {setState} = StateUseFecth();

  const newWeek = new Week(currentWeek);
  const { updateMeal } = useMealStore();

  useEffect(() => {
    setState(true, '');
      fetch(url)
      .then(response => {
        if (!response.ok) { 
          // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return response.json();
      })
      .then(data => {
        setState(false, '');
        setData(data);
      })
      .catch(err => {
        setState(false, err.message);
      })
  }, [])

  const mondayDate = getMondayOfWeek(currentWeek, new Date().getFullYear());

  Object.entries(newWeek.days).forEach(([dayName, dayObject], index) => {
    const dayDate = new Date(mondayDate);
    dayDate.setDate(mondayDate.getDate() + index);

    dayObject.date = moment(dayDate).format("DD/MM/YYYY");
    updateMeal(dayName, type, (data as any).hits[index]);
  });
}

export default useFetch;