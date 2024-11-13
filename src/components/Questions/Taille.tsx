import User from "../../objects/User";
import { useState } from "react";

interface TailleProps {
    user: User;
    updateUser: (updatedFields: { _height: number }) => void;
    setNbQuestion: (value: number) => void;
  }

  function Taille({ user, updateUser, setNbQuestion }: TailleProps) {
    const [height, setHeight] = useState(user.height); // Utiliser useState pour lier l'input au nom de l'utilisateur
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      updateUser({ _height : height }); // Mettre à jour le nom de l'utilisateur dans le store
      setNbQuestion((prevNbQuestion) => prevNbQuestion + 1); // Passer à la question suivante
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeight(e.target.value); // Mettre à jour la valeur de 'name' dans le state
    };
  
    return (
      <div>
        <h1>Quel est votre taille en cm ?</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={height} // Lier l'input à la valeur 'name'
            onChange={handleChange} // Mettre à jour le 'name' à chaque saisie
          />
          <button type="submit">Suivant</button>
        </form>
      </div>
    );
  }

export default Taille;