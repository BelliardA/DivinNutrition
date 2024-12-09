import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useMealStore from "../store/MealPlan";
import { DaysOfWeek } from "../objects/Constants";

function ListeCourse() {
    const navigate = useNavigate();
    const { week } = useMealStore();
    const semaine = week?._days;
    const transformedIngredients = {};

    Object.values(DaysOfWeek).forEach((day) => {
        const mealTypes = ['_breakfast', '_lunch', '_dinner'];

        mealTypes.forEach((mealType) => {
            if (semaine?.[day]?.[mealType]?.recipe?.ingredients?.length > 0) {
                semaine[day][mealType].recipe.ingredients.forEach((ingredient) => {
                    const key = `${ingredient.food}-${ingredient.measure}`;

                    if (transformedIngredients[key]) {
                        transformedIngredients[key].quantity += ingredient.quantity;
                    } else {
                        transformedIngredients[key] = {
                            food: ingredient.food,
                            quantity: ingredient.quantity,
                            measure: ingredient.measure,
                        };
                    }
                });
            }
        });
    });

    const ingredientsArray = Object.values(transformedIngredients).sort((a, b) =>
        a.food.localeCompare(b.food)
    );

    const backToMenu = () => {
        navigate("/");
    };

    return (
        <div>
            <button onClick={backToMenu} className="back-row">
                <ArrowLeft size={36} color="#000000" />
            </button>
            <h1>Liste de course</h1>
            <ul>
                {ingredientsArray.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient.food}: {ingredient.quantity} {ingredient.measure}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListeCourse;