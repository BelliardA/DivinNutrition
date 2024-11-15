import { useState } from "react";
import DashBoard from "./components/DashBoard";


import StartQuestion from "./components/StartQuestion";

function App() {
  const [isQuestionnaire, setIsQuestionnaire] = useState<boolean>(false);

  if(!isQuestionnaire) {
    return (
      <div>
        <StartQuestion setIsQuestionnaire={setIsQuestionnaire} />
      </div>
    );
  }else{
    
    return (
      <div>
        <DashBoard />
      </div>
    );
  }



}

export default App
