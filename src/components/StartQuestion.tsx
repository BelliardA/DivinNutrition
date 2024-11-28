import "../style/StartQuestion.css";
import useUserStore  from "../store/User";
import { useState, useEffect } from "react";
import Nom from "./Questions/Nom";
import Sexe from "./Questions/Sexe";
import Taille from "./Questions/Taille";
import Poids from "./Questions/Poids";
import Age from "./Questions/Age";
import ActivitePro from "./Questions/ActivitePro";
import Activity from "./Questions/Atcivity";

interface StartQuestionProps {
    setIsQuestionnaire: (value: boolean) => void;
  }

function StartQuestion({ setIsQuestionnaire }: StartQuestionProps) {
    const { user, updateUser} = useUserStore();
    const [nbQuestion, setNbQuestion] = useState<number>(0);

    useEffect(() => {
        if(nbQuestion === 7) {
            setIsQuestionnaire(true);
        }
    },[nbQuestion]);

    return (
      <div>
        <section className="bloc-question">
            {nbQuestion === 0 && <Nom user={user} updateUser={updateUser} setNbQuestion={setNbQuestion}/>}
            {nbQuestion === 1 && <Age user={user} updateUser={updateUser} setNbQuestion={setNbQuestion}/>}
            {nbQuestion === 2 && <Sexe user={user} updateUser={updateUser} setNbQuestion={setNbQuestion}/>}
            {nbQuestion === 3 && <Taille user={user} updateUser={updateUser} setNbQuestion={setNbQuestion}/>}
            {nbQuestion === 4 && <Poids user={user} updateUser={updateUser} setNbQuestion={setNbQuestion}/>}
            {nbQuestion === 5 && <ActivitePro user={user} updateUser={updateUser} setNbQuestion={setNbQuestion}/>}
            {nbQuestion === 6 && <Activity user={user} updateUser={updateUser} setNbQuestion={setNbQuestion}/>}
         </section>
      </div>
    );

}

export default StartQuestion;