import "../style/Liste.css";
import { useState, useEffect } from "react";
import Aliment from "../store/Aliment";

export interface macroNutrient{
  protein: number;
  glucides: number;
  lipids: number;
  calories: number;
}

function List() {
  const { alimentsId, delAliments} = Aliment();
  const [aliments, setAliments] = useState<any[]>([]); // To store the fetched aliment data

  const fetchAliments = async (id: number) => {
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.product;  
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchAllAliments = async () => {
      const alimentData = await Promise.all(
        alimentsId.map((id) => fetchAliments(id)) 
      );
      setAliments(alimentData.filter((aliment) => aliment !== null));

    };

    fetchAllAliments();


  }, [alimentsId]); 

  const handleDelAliment = (id:number, name: string) => {
    const confirmDelete = window.confirm(`Voulez-vous vraiment supprimer ${name} de la liste ?`);

    if (confirmDelete) {
      delAliments(id);
    }
    else{
      return;
    }
  };

  return (
    <div className="results">
      <div className="label">
        <p>Nom</p>
        <p className="p-discret">Calories / 100g</p>
      </div>

      {aliments.map((aliment) => (
        <div key={aliment.id}>
          <button
            className="btn-add-liste"
            onClick={() => handleDelAliment(aliment.id, aliment.product_name)}
          >
            <div className="ligne">
              <p>{aliment.product_name}</p>
              <div>
                <img
                  className="aliment-img"
                  src={aliment.image_front_small_url}
                  alt={aliment.product_name}
                />
              </div>
              <p className="p-discret">
                {aliment.nutriments["energy-kcal_100g"] || "N/A"} {/* Show calories or "N/A" if not available */}
              </p>
            </div>
            <div className="separateur"></div>
          </button>
        </div>
      ))}
    </div>
  );
}

export default List;