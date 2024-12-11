import { useEffect, useState } from "react";

import MealPlanDashboard from "./Date";
import DashBoard from "./DashBoard";
import StartQuestion from "./StartQuestion";


function Home() {
  const [currentWeek, setCurrentWeek] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [isQuestionnaire, setIsQuestionnaire] = useState<boolean>(() => {
    const savedValue = localStorage.getItem('isQuestionnaire');
    // Si une valeur est présente, la convertir en booléen, sinon retourner false
    return savedValue ? JSON.parse(savedValue) : false;
  });

  // Sauvegarder la valeur de isQuestionnaire dans localStorage chaque fois qu'il change
  useEffect(() => {
    localStorage.setItem('isQuestionnaire', JSON.stringify(isQuestionnaire));
  }, [isQuestionnaire]);
  

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
        <DashBoard currentWeek={currentWeek}/>
      </>
    );
  }



}

export default Home
