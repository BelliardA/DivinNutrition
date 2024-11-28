import "./../style/CardMeal.css"
import { Timer } from "lucide-react";

function CardMeal({ data }: { data: any }) {
    const nbIngredients = data.recipe.ingredientLines.length;
    return (
      <section className="containCard">
        <div className="card"
        style={{ backgroundImage: `url(${data.recipe.image})` }}>
            <div className="title-card">
                <h4>{data.recipe.label}</h4>
            </div>
        </div>
        <div className="details">
            <Timer />
            <p>{data.recipe.totalTime} min</p>
            <p className="separateur">.</p>
            <p>{nbIngredients} ingrédients</p>
        </div>
      </section>
    );
  }
  
  export default CardMeal;