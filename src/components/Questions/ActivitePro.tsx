import { useState } from "react";
import { UserStore } from "../../store/User";
import { ProfessionalActivity } from "../../objects/Constants";

interface ActiviteProProps {
  updateUser: UserStore["updateUser"];
  incrementNbQuestion: () => void;
}

function ActivitePro({ updateUser, incrementNbQuestion }: ActiviteProProps) {
  const [activityPro, setActivityPro] = useState<ProfessionalActivity>(
    ProfessionalActivity.Sedentary
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser("_activityPro", activityPro);
    incrementNbQuestion(); // Passer à la question suivante
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivityPro(e.target.value as unknown as ProfessionalActivity); // Mettre à jour l'état de l'utilisateur
  };

  return (
    <div className="container-question">
      <form className="formulaire" onSubmit={handleSubmit}>
        <h1>Dans votre activité professionnel, vous êtes :</h1>
        <div className="group-radio">
          <label>
            <input
              className="radio"
              type="radio"
              value={ProfessionalActivity.Sedentary}
              checked={activityPro === ProfessionalActivity.Sedentary}
              onChange={handleChange}
            />
            Sédentaire: travail de bureau, peu d’activité
          </label>
          <label>
            <input
              className="radio"
              type="radio"
              value={ProfessionalActivity.Moderate}
              checked={activityPro === ProfessionalActivity.Moderate}
              onChange={handleChange}
            />
            Modéré : activité physique légère, activité physique modéré
          </label>
          <label>
            <input
              className="radio"
              type="radio"
              value={ProfessionalActivity.Active}
              checked={activityPro === ProfessionalActivity.Active}
              onChange={handleChange}
            />
            Actif : travail physiquement exigeant
          </label>
        </div>
        <button className="btn-submit" type="submit"><h3>Suivant</h3></button>
      </form>
    </div>
  );
}

export default ActivitePro;
