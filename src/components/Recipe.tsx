import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useMealStore from "../store/MealPlan";
import "../style/Recipe.css";

function Recipe() {
    const { day, mealType } = useParams();
    const navigate = useNavigate();
    const { week } = useMealStore();

    let recipe = "";
    switch (mealType) {
        case "breakfast":
            recipe = week._days[day]._breakfast.recipe;
            break;
        case "lunch":
            recipe = week._days[day]._lunch.recipe;
            break;
        case "dinner":
            recipe = week._days[day]._dinner.recipe;
            break;
        default:
            break;
    }

    const backToMenu = () => {
        navigate(`/recipe-details/${day}/${mealType}`);
    };

    return (
        <div className="recipe-container">
            <div>
                <button onClick={backToMenu} className="back-row">
                    <ArrowLeft size={36} color="#000000" />
                </button>
                <h1>Recette 🔪</h1>
            </div>
            <div className="ingredient-steps">
                {recipe.ingredientLines.map((ingredient, index) => (
                    <div key={index} className="ingredient-step">
                        <h4>Étape {index + 1}</h4>
                        <p>{ingredient}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recipe;