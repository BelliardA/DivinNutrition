import { useState } from "react";
import DashBoard from "./components/DashBoard";
import MealPlanDashboard from "./components/Date";


import StartQuestion from "./components/StartQuestion";

function App() {
  const [isQuestionnaire, setIsQuestionnaire] = useState<boolean>(false);
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [isWeekAlreadyFetched, setIsWeekAlreadyFetched] = useState(false);



  console.log(currentDate);
  console.log(currentWeek);

  if(isQuestionnaire) {
    return (
      <div>
        <StartQuestion setIsQuestionnaire={setIsQuestionnaire} />
      </div>
    );
  }else{
    
    return (
      <div>
        <MealPlanDashboard setCurrentWeek={setCurrentWeek} setCurrentDate={setCurrentDate}/>
        <p>{currentDate}</p>
        <p>{currentWeek}</p>
        <DashBoard currentWeek={currentWeek} currentDate={currentDate}/>
      </div>
    );
  }



}

export default App
