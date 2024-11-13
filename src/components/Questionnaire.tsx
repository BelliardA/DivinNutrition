import { useState } from "react";
import StartQuestion from "./StartQuestion";

import User from "../objects/User";


function Questionnaire() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [activity, setActivity] = useState(0);
  const [sexe, setSexe] = useState(true);


  if(isSubmitted) {
    const user = new User(name, age, weight, height, activity, sexe);
    console.log(user);
  }

  return (
    <div>
      <StartQuestion />
    </div>
  );
}

export default Questionnaire;
