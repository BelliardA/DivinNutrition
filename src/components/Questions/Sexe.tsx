import { UserStore } from "../../store/User";

interface SexeProps {
  updateUser: UserStore["updateUser"];
  incrementNbQuestion: () => void;
}

function Sexe({ updateUser, incrementNbQuestion }: SexeProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === "true"; // Convertir "true"/"false" en boolean
        console.log(value); // Afficher la valeur sélectionnée
        updateUser({ sexe: value }); // Mettre à jour l'état de l'utilisateur
      };

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        incrementNbQuestion(); // Passer à la question suivante
      };

  return (
    <div>
      <h1>Quel est votre sexe ?</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            value="true"
            checked={sexe === true}
            onChange={handleChange}
          />
          Homme
        </label>
        <label>
          <input
            type="radio"
            value="false"
            checked={user.sexe === false}
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
