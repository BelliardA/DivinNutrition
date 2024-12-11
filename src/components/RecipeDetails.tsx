import { useParams } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Timer, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useMealStore from "../store/MealPlan";
import "../style/RecipeDetails.css"
import { useState } from "react";

function RecipeDetails (){
    const {day, mealType} = useParams();
    const navigate = useNavigate();
    const [nbServing, setNbServing] = useState(1);

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
        navigate("/meal-plan/48"); //rendre dynamique, avec la current week dans le cas d'une api fonctionnelle
    }

    const handlePlus = () => {
        setNbServing(nbServing + 1);
    }

    const handleMinus = () => {
        if(nbServing > 1){
            setNbServing(nbServing - 1);
        }
    }

    const handleSeeRecipe = () => {
        navigate(`/recipe/${day}/${mealType}`);
    }
    
    return (
        <main className="recipe-details">
            <button onClick={backToMenu} className="back-row">
                <ArrowLeft size={36} color="#000000" />
            </button>
            <h2 className="title-recipe">{recipe.label}</h2>
            <section className="infos-techniques">
                <div className="detail-utile">
                <div className="timer">
                    <Timer />
                    <p>{recipe.totalTime} min</p>
                </div>
                <h4 className="details-utile-sep">.</h4>
                <p className="ingredient">{recipe.ingredients.length} ingrédients</p>
                <h4 className="details-utile-sep">.</h4>
                <div className="nb-personnes">
                    <p>{recipe.yield}</p>
                    <Users />
                </div>
                </div>
                <div
                className="card-recipe"
                style={{ backgroundImage: `url(${recipe.image})` }}></div>
                <div className="kcal-recipe">
                    <h1>{Math.round(recipe.totalNutrients.ENERC_KCAL.quantity / recipe.yield)} kcal</h1>
                    <p>Par portion</p>
                </div>
                <div className="macro-recipe">
                    <div className="glucides-recipe contains-macro">
                        <div className="color"></div>
                        <div>
                            <h4>Glucides</h4>
                            <p>{Math.round(recipe.totalNutrients.CHOCDF.quantity / recipe.yield)}g</p>
                        </div>
                    </div>
                    <div className="lipids-recipe contains-macro">
                        <div className="color"></div>
                        <div>
                            <h4>Lipides</h4>
                            <p>{Math.round(recipe.totalNutrients.FAT.quantity / recipe.yield)}g</p>
                        </div>
                    </div>
                    <div className="proteins-recipe contains-macro">
                        <div className="color"></div>
                        <div>
                            <h4>Protéines</h4>
                            <p>{Math.round(recipe.totalNutrients.PROCNT.quantity / recipe.yield)}g</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="ingredients">
                <h2>Ingrédients 🧑‍🍳</h2>
               <div className="nb-serving">
                <button onClick={handleMinus}>
                    <Minus />
                </button>
               <p>{nbServing} Personne(s)</p>
               <button onClick={handlePlus}>
                    <Plus />
               </button>
               </div>
               <div className="ingredients-list">
                    {recipe.ingredients.map((ingredient, index) => (
                        <div key={index} className="list-organisation">
                            <div className="ingredient-in-list">
                                <p className="ingredient-food">{ingredient.quantity * nbServing} {ingredient.measure != "<unit>" ? ingredient.measure : null}</p>
                                <img src={ingredient.image} alt={ingredient.foodCategory} />
                                <p className="p-discret ingredient-food">{ingredient.food}</p>
                            </div>
                            <div className="separateur-ingredients"></div>
                        </div>
                    ))}
               </div>
            </section>
            <button onClick={handleSeeRecipe} className="btn-go-recipe"><h3>Voir la recette</h3></button>
        </main>
    )
}

export default RecipeDetails;