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
      <div>
        <h1>Vous avez quel age ?</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={age} // Lier l'input à la valeur 'name'
            onChange={handleChange} // Mettre à jour le 'name' à chaque saisie
          />
          <button type="submit">Suivant</button>
        </form>
      </div>
    );
  }

export default Age;