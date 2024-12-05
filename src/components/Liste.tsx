import "../style/Liste.css";
import { useState, useEffect } from "react";
import Aliment from "../store/Aliment";

function List() {
  const { alimentsId } = Aliment();
  const [aliments, setAliments] = useState<any[]>([]); // To store the fetched aliment data

  // Function to fetch aliment data based on id
  const fetchAliments = async (id: number) => {
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.product;  // Assuming the product data is inside "product"
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  };

  // UseEffect hook to fetch aliments when component mounts or when alimentsId changes
  useEffect(() => {
    const fetchAllAliments = async () => {
      const alimentData = await Promise.all(
        alimentsId.map((id) => fetchAliments(id))  // Fetch data for all aliment ids
      );
      setAliments(alimentData.filter((aliment) => aliment !== null)); // Set state with valid data
    };

    fetchAllAliments();
  }, [alimentsId]); // Trigger when the list of alimentsId changes

  const handleAddAliment = (id: number) => {
    // Your logic for adding aliment (e.g., add to a list or update store)
    console.log("Aliment added:", id);
  };

  return (
    <div className="results">
      <div className="label">
        <p>Nom</p>
        <p className="p-discret">Calories</p>
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