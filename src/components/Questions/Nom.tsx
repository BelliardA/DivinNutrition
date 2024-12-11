import { useState } from "react";
import { UserStore } from "../../store/User";
import "../../style/Formulaire.css"

interface NomProps {
    updateUser: UserStore["updateUser"];
    incrementNbQuestion: () => void;
  }

  function Nom({ updateUser, incrementNbQuestion }: NomProps) {
    const [name, setName] = useState(""); // Utiliser useState pour lier l'input au nom de l'utilisateur
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      updateUser('_name', name); // Mettre à jour le nom de l'utilisateur dans le store
      incrementNbQuestion(); // Passer à la question suivante
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value); // Mettre à jour la valeur de 'name' dans le state
    };
  
    return (
      <div className="container-question">
        <form className="formulaire" onSubmit={handleSubmit}>
        <h1>Quel est votre nom ?</h1>
          <input
            className="input"
            type="text"
            value={name} // Lier l'input à la valeur 'name'
            onChange={handleChange} // Mettre à jour le 'name' à chaque saisie
          />
          <button className="btn-submit" type="submit"><h3>Suivant</h3></button>
        </form>
      </div>
    );
  }

export default Nom;