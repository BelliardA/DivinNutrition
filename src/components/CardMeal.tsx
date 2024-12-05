import "./../style/CardMeal.css";
import { Timer } from "lucide-react";
import useMealStore from "../store/MealPlan";
import { DaysOfWeek, MealType } from "../objects/Constants";
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
          className="card"
          style={{ backgroundImage: `url(${data.recipe.image})` }}
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
