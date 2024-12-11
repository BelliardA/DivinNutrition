import "./../style/CardMeal.css";
import { Timer } from "lucide-react";
import useMealStore from "../store/MealPlan";
import { MealType } from "../objects/Constants";
import { useEffect, useState } from "react";

interface CardMealProps {
  mealType: string;
  dayName: string;
}

function CardMeal({ mealType, dayName }: CardMealProps) {
  const { week } = useMealStore();
  const [data, setData] = useState<string>();

  

  useEffect(() => {
    switch (mealType) {
      case MealType.Breakfast:
        setData(week._days[dayName]._breakfast);
        break;
      case MealType.Lunch:
        setData(week._days[dayName]._lunch);
        break;
      case MealType.Dinner:
        setData(week._days[dayName]._dinner);
        break;
    }
  }, []);

  if (data) {
    const nbIngredients = data.recipe.ingredients.length;
    return (
      <section className="containCard">
        <div
          className="cardMeal"
          style={{ backgroundImage: `url(https://recipeimages.migros.ch/crop/v-w-2000-h-1500-a-center_center/e5e22aa30baed1b3a2390fcfafc89b8eb5683a0d/riz-casimir-0-4-3.jpg)` }} //style={{ backgroundImage: `url(${data.recipe.image})` }} dans le cas ou l'api fonctionne
        >
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
  } else {
    return <p>Loading....</p>;
  }
}

export default CardMeal;
