import { useState } from "react";
import "../style/Liste.css";
import "../style/SearchAliment.css";
import { Search, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Aliment from "../store/Aliment";

function SearchAliment() {
  const [search, setSearch] = useState<string>("");
  const [aliments, setAliment] = useState<any[]>([]);
    const navigate = useNavigate();
    const {setAliments} = Aliment();

  const fetchAliments = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data); // Logs the entire response data
      setAliment(data.products); // Update state with fetched products
    } catch (error) {
      console.error("Fetch error:", error); // Logs any error that occurs
    }
  };

  const submited = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let url = `https://world.openfoodfacts.org/api/v2/search?categories_tags_fr=${search}`;
    fetchAliments(url);
    // if(aliments.count == 0){
    //     console.log('no result')
    //     url = `https://world.openfoodfacts.org/api/v2/search?brands_tags=${search}`
    //     fetchAliments(url)
    // }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAddAliment = (id: number) => {
    setAliments(id);
    navigate("/");
  };

  const backToMenu = () => {
    navigate("/");
}

  return (
    <div className="contain-search-aliment">
        <button onClick={backToMenu} className="back-row">
            <ArrowLeft size={36} color="#000000" />
        </button>
        <div className="title-zone">
            <h2>C’est bon pour vous !!</h2>
            <p>Tous les plats qui vont sont proposé, ci-dessous, rentre dans votre objectif.Alors n’hésitez pas, faites vous plaisir 😁</p>
        </div>
      <form className="search" onSubmit={submited}>
        <input
          className="input-search"
          onChange={handleChange}
          value={search}
          type="text"
          placeholder="Rechercher un aliment"
        />
        <button className="btn-search"><Search size={40} color="#ffffff" /></button>
      </form>

      <div className="results">
        <div className="label">
          <p>Nom</p>
          <p className="p-discret">Calories / 100g</p>
        </div>
        {aliments.map((aliment) => {
          return (
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
                      alt=""
                    />
                  </div>
                  <p className="p-discret">
                    {aliment.nutriments["energy-kcal_100g"]}
                  </p>
                </div>
                <div className="separateur"></div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchAliment;
