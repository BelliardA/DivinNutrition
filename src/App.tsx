import { useEffect, useState } from "react";
import useMealStore from "./store/MealPlan";

import MealPlanDashboard from "./components/Date";
import DashBoard from "./components/DashBoard";
import StartQuestion from "./components/StartQuestion";


function App() {
  const [isQuestionnaire, setIsQuestionnaire] = useState<boolean>(false);
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);
  const [currentDate, setCurrentDate] = useState<string>("");
  const { week } = useMealStore();
  const [isWeekAlreadyFetched, setIsWeekAlreadyFetched] = useState<boolean>(
    () => JSON.parse(localStorage.getItem('isWeekAlreadyFetched') || 'false')
  );

  useEffect(() => {
    // Enregistre la valeur dans le Local Storage chaque fois qu'elle change
    localStorage.setItem('isWeekAlreadyFetched', JSON.stringify(isWeekAlreadyFetched));
  }, [isWeekAlreadyFetched]);

  useEffect(() => {
    // Seulement réinitialiser si la semaine n'a pas été récupérée
    if (!isWeekAlreadyFetched) {
      setIsWeekAlreadyFetched(false);
    }
  }, [currentWeek]);


  if(!isQuestionnaire) { //mettre !isQuestionnaire pour la version finale
    return (
      <div>
        <StartQuestion setIsQuestionnaire={setIsQuestionnaire} />
      </div>
    );
  }else{
    return (
      <>
        <MealPlanDashboard setCurrentWeek={setCurrentWeek} setCurrentDate={setCurrentDate}/>
        <DashBoard currentWeek={currentWeek} isWeekAlreadyFetched={isWeekAlreadyFetched} setIsWeekAlreadyFetched={setIsWeekAlreadyFetched}/>
      </>
    );
  }



}

export default App
