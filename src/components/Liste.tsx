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
  const { alimentsId, setNutrients} = Aliment();
  const [aliments, setAliments] = useState<any[]>([]); // To store the fetched aliment data
  const [prepareForNutrients, setPrepareForNutrients] = useState<macroNutrient[]>([]);

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

  const handleAddAliment = (id: number) => {
    console.log("Aliment added:", id);
  };

  aliments.map((aliment) => {
    let fat = aliment.nutriments_estimated.fat_100g;
    let protein = aliment.nutriments_estimated.proteins_100g;
    let carbohydrates = aliment.nutriments_estimated.carbohydrates_100g;
    let calories = aliment.nutriments_estimated["energy-kcal_100g"];
    console.log("Fat:", fat, "Protein:", protein, "Carbohydrates:", carbohydrates, "Calories:", calories);
  });

  console.log("Aliments:", aliments);

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
            onClick={() => handleAddAliment(aliment.id)}
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