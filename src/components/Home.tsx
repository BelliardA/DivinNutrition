import { useState } from "react";

import MealPlanDashboard from "./Date";
import DashBoard from "./DashBoard";
import StartQuestion from "./StartQuestion";


function Home() {
  const [isQuestionnaire, setIsQuestionnaire] = useState<boolean>(false);
  const [currentWeek, setCurrentWeek] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState<string>("");

  

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
