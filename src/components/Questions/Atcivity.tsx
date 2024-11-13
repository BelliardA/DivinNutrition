import User from "../../objects/User";

interface ActivityProps {
  user: User;
  updateUser: (updatedFields: { _activity: number }) => void;
  setNbQuestion: (value: number) => void;
}

function Activity({ user, updateUser, setNbQuestion }: ActivityProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // Convertir "true"/"false" en boolean
    console.log(value); // Afficher la valeur sélectionnée
    updateUser({ _activity: value }); // Mettre à jour l'état de l'utilisateur
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNbQuestion((prevNbQuestion: number) => prevNbQuestion + 1); // Passer à la question suivante
  };

  return (
    <div>
      <h1>Faites vous des activités sportives ?</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            value="1"
            checked={user.activity === 1}
            onChange={handleChange}
          />
          Jamais
        </label>
        <label>
          <input
            type="radio"
            value="2"
            checked={user.activity === 2}
            onChange={handleChange}
          />
          Entre 1 et 2 fois par semaine{" "}
        </label>
        <label>
          <input
            type="radio"
            value="3"
            checked={user.activity === 3}
            onChange={handleChange}
          />
          Entre 2 et 3 fois par semaine{" "}
        </label>
        <label>
          <input
            type="radio"
            value="3"
            checked={user.activity === 4}
            onChange={handleChange}
          />
          Entre 4 et 5 fois par semaine{" "}
        </label>
        <label>
          <input
            type="radio"
            value="3"
            checked={user.activity === 5}
            onChange={handleChange}
          />
           6 fois par semaine ou plus{" "}
        </label>
        <button type="submit">Suivant</button>
      </form>
    </div>
  );
}

export default Activity;
