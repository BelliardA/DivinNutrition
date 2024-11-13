import { useState } from "react";

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
        <h1>Le questionnaire est fini</h1>
      </div>
    );
  }



}

export default App
