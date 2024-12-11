import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useMealStore from "../store/MealPlan";
import { DaysOfWeek } from "../objects/Constants";
import "../style/ListeCourse.css";

// Fonction pour regrouper et formater la liste de courses
function mergeShoppingList(shoppingList) {
    const groupedItems = {};

    shoppingList.forEach((item) => {
        const normalizedFood = item.food.toLowerCase().trim(); // Normalisation des noms

        if (!groupedItems[normalizedFood]) {
            groupedItems[normalizedFood] = [];
        }

        // Ajoute l'article avec sa quantité et son unité
        if (item.quantity > 0) {
            groupedItems[normalizedFood].push({
                quantity: item.quantity,
                measure: item.measure || "<unit>",
            });
        }
    });

    // Formatage de la liste regroupée
    const mergedList = Object.entries(groupedItems).map(([food, measures]) => {
        const combinedMeasures = measures
            .map((measure) => `${measure.quantity} ${measure.measure}`.trim())
            .join(", ");

        return { food, combinedMeasures };
    });

    return mergedList;
}

function ListeCourse() {
    const navigate = useNavigate();
    const { week } = useMealStore();
    const semaine = week?._days;
    const rawIngredients = [];

    // Extraction des ingrédients bruts
    Object.values(DaysOfWeek).forEach((day) => {
        const mealTypes = ["_breakfast", "_lunch", "_dinner"];

        mealTypes.forEach((mealType) => {
            const ingredients = semaine?.[day]?.[mealType]?.recipe?.ingredients;
            if (ingredients?.length > 0) {
                rawIngredients.push(...ingredients);
            }
        });
    });

    // Application de la fonction mergeShoppingList pour regrouper et formater
    const ingredientsArray = mergeShoppingList(rawIngredients);

    const backToMenu = () => {
        navigate("/");
    };

    return (
        <div>
            <button onClick={backToMenu} className="back-row">
                <ArrowLeft size={36} color="#000000" />
            </button>
            <h1>Liste de course 🛒</h1>
            <div className="label-liste-course">
                <p>Nom</p>
                <p className="p-discret">Quantité</p>
            </div>
            <div className="contain-liste-course">
                {ingredientsArray.map((ingredient, index) => (
                    <div className="liste-course" key={index}>
                        <div className="in-list-course">
                            <h4>{ingredient.food}</h4>
                            <p>{ingredient.combinedMeasures}</p>
                        </div>
                        <div className="separateur"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListeCourse;