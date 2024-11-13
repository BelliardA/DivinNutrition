import User from "../../objects/User";

interface ActiviteProProps {
  user: User;
  updateUser: (updatedFields: { _activityPro: number }) => void;
  setNbQuestion: (value: number) => void;
}

function ActivitePro({ user, updateUser, setNbQuestion }: ActiviteProProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value; // Convertir "true"/"false" en boolean
        console.log(value); // Afficher la valeur sélectionnée
        updateUser({ _activityPro: value }); // Mettre à jour l'état de l'utilisateur
      };

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setNbQuestion((prevNbQuestion: number) => prevNbQuestion + 1); // Passer à la question suivante
      };

  return (
    <div>
      <h1>Dans votre activité professionnel, vous êtes :</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            value="1"
            checked={user.activityPro === 1}
            onChange={handleChange}
          />
          Sédentaire: travail de bureau, peu d’activité
        </label>
        <label>
          <input
            type="radio"
            value="2"
            checked={user.activityPro === 2}
            onChange={handleChange}
          />
          Modéré : activité physique légère, activité physique modéré
        </label>
        <label>
          <input
            type="radio"
            value="3"
            checked={user.activityPro === 3}
            onChange={handleChange}
          />
        Actif : travail physiquement exigeant
        </label>
        <button type="submit">Suivant</button>
      </form>
    </div>
  );
}

export default ActivitePro;
