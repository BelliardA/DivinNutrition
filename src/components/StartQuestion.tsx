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

  interface Questions {
    setNbQuestion: (value: number) => void;
  }

function StartQuestion({ setIsQuestionnaire }: StartQuestionProps) {
    const { updateUser} = useUserStore();
    const [nbQuestion, setNbQuestion] = useState<number>(0);

    const incrementNbQuestion = () => {
        setNbQuestion(nbQuestion + 1);
    }

    useEffect(() => {
        if(nbQuestion === 7) {
            setIsQuestionnaire(true);
        }
    },[nbQuestion]);

    return (
      <div>
        <section className="bloc-question">
            {nbQuestion === 0 && <Nom updateUser={updateUser} incrementNbQuestion={incrementNbQuestion}/>}
            {nbQuestion === 1 && <Age updateUser={updateUser} incrementNbQuestion={incrementNbQuestion}/>}
            {nbQuestion === 2 && <Sexe updateUser={updateUser} incrementNbQuestion={incrementNbQuestion}/>}
            {nbQuestion === 3 && <Taille updateUser={updateUser} incrementNbQuestion={incrementNbQuestion}/>}
            {nbQuestion === 4 && <Poids updateUser={updateUser} incrementNbQuestion={incrementNbQuestion}/>}
            {nbQuestion === 5 && <ActivitePro updateUser={updateUser} incrementNbQuestion={incrementNbQuestion}/>}
            {nbQuestion === 6 && <Activity updateUser={updateUser} incrementNbQuestion={incrementNbQuestion}/>}
         </section>
      </div>
    );

}

export default StartQuestion;