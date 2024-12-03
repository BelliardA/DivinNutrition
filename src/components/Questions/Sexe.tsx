import { UserStore } from "../../store/User";
import { Sexe as SexeConstants } from "../../objects/Constants";
import { useState } from "react";

interface SexeProps {
  updateUser: UserStore["updateUser"];
  incrementNbQuestion: () => void;
}

function Sexe({ updateUser, incrementNbQuestion }: SexeProps) {
  const [sexe, setSexe] = useState<SexeConstants>(SexeConstants.Homme); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser('_sexe', sexe); // Mettre à jour le nom de l'utilisateur dans le store
    incrementNbQuestion(); // Passer à la question suivante
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSexe(e.target.value as SexeConstants); // Mettre à jour l'état de l'utilisateur
    };

  return (
    <div>
      <h1>Quel est votre sexe ?</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            value="true"
            checked={sexe === SexeConstants.Homme}
            onChange={handleChange}
          />
          Homme
        </label>
        <label>
          <input
            type="radio"
            value="false"
            checked={sexe === SexeConstants.Femme}
            onChange={handleChange}
          />
          Femme
        </label>
        <button type="submit">Suivant</button>
      </form>
    </div>
  );
}

export default Sexe;
