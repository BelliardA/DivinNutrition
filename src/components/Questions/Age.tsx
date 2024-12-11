import { useState } from "react";
import { UserStore } from "../../store/User";

interface AgeProps {
    updateUser: UserStore["updateUser"];
    incrementNbQuestion: () => void;
  }

  function Age({updateUser, incrementNbQuestion }: AgeProps) {
    const [age, setAge] = useState<number>(0); // Utiliser useState pour lier l'input au nom de l'utilisateur
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      updateUser('_age', age); // Mettre à jour le nom de l'utilisateur dans le store
      incrementNbQuestion(); // Passer à la question suivante
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAge(Number(e.target.value)); // Mettre à jour la valeur de 'name' dans le state
    };  
  
    return (
      <div className="container-question">
        <form className="formulaire" onSubmit={handleSubmit}>
        <h1>Vous avez quel age ?</h1>
          <input
            className="input"
            type="number"
            value={age} // Lier l'input à la valeur 'name'
            onChange={handleChange} // Mettre à jour le 'name' à chaque saisie
          />
          <button className="btn-submit" type="submit"><h3>Suivant</h3></button>
        </form>
      </div>
    );
  }

export default Age;