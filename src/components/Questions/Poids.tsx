import User from "../../objects/User";
import { useState } from "react";

interface PoidsProps {
    user: User;
    updateUser: (updatedFields: { _weight: number }) => void;
    setNbQuestion: (value: number) => void;
  }

  function Poids({ user, updateUser, setNbQuestion }: PoidsProps) {
    const [weight, setWeight] = useState(user.weight); // Utiliser useState pour lier l'input au nom de l'utilisateur
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      updateUser({ _weight : weight }); // Mettre à jour le nom de l'utilisateur dans le store
      setNbQuestion((prevNbQuestion) => prevNbQuestion + 1); // Passer à la question suivante
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(e.target.value); // Mettre à jour la valeur de 'name' dans le state
    };
  
    return (
      <div>
        <h1>Quel est votre poids en Kg ?</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={weight} // Lier l'input à la valeur 'name'
            onChange={handleChange} // Mettre à jour le 'name' à chaque saisie
          />
          <button type="submit">Suivant</button>
        </form>
      </div>
    );
  }

export default Poids;