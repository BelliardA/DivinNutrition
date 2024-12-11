import { UserStore } from "../../store/User";
import { useState } from "react";
import { ActivityLevel } from "../../objects/Constants";

interface ActivityProps {
  updateUser: UserStore["updateUser"];
  incrementNbQuestion: () => void;
}

function Activity({ updateUser, incrementNbQuestion }: ActivityProps) {
  const [activity, setActivity] = useState<ActivityLevel>(
    ActivityLevel.Sedentary
  ); // Utiliser useState pour lier l'input au nom de l'utilisateur

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser("_activity", activity);
    incrementNbQuestion(); // Passer à la question suivante
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivity(Number(e.target.value) as ActivityLevel); // Mettre à jour la valeur de 'name' dans le state
  };

  return (
    <div className="container-question">
      <form className="formulaire" onSubmit={handleSubmit}>
        <h1>Faites vous des activités sportives ?</h1>
        <div className="group-radio">
          <label>
            <input  
              className="radio"
              type="radio"
              value={ActivityLevel.None}
              checked={activity === ActivityLevel.None}
              onChange={handleChange}
            />
            Jamais
          </label>
          <label>
            <input
              className="radio"
              type="radio"
              value={ActivityLevel.Sedentary}
              checked={activity === ActivityLevel.Sedentary}
              onChange={handleChange}
            />
            Entre 1 et 2 fois par semaine{" "}
          </label>
          <label>
            <input
              className="radio"
              type="radio"
              value={ActivityLevel.LightlyActive}
              checked={activity === ActivityLevel.LightlyActive}
              onChange={handleChange}
            />
            Entre 2 et 3 fois par semaine{" "}
          </label>
          <label>
            <input
              className="radio"
              type="radio"
              value={ActivityLevel.Active}
              checked={activity === ActivityLevel.Active}
              onChange={handleChange}
            />
            Entre 4 et 5 fois par semaine{" "}
          </label>
          <label>
            <input
              className="radio"
              type="radio"
              value={ActivityLevel.VeryActive}
              checked={activity === ActivityLevel.VeryActive}
              onChange={handleChange}
            />
            6 fois par semaine ou plus{" "}
          </label>
        </div>
        <button className="btn-submit" type="submit"><h3>Suivant</h3></button>
      </form>
    </div>
  );
}

export default Activity;
