import { useEffect, useState } from "react";
import Week from "../objects/Week";
const appId = import.meta.env.VITE_EDAMAM_APP_ID;
const appKey = import.meta.env.VITE_EDAMAM_APP_KEY;

function MealPlan({
  nbCalBreakfast,
  nbCalLunch,
  nbCalDinner,
  nbCalSnack,
}: {
  nbCalBreakfast: number;
  nbCalLunch: number;
  nbCalDinner: number;
  nbCalSnack: number;
}) {
  const week = new Week(1);

  const [isFeteched, setIsFetched] = useState<boolean>(false);

  // Types de cuisine
  const cuisineType = [
    "American",
    "Asian",
    "British",
    "Caribbean",
    "Central%20Europe",
    "Eastern%20Europe",
    "French",
    "Indian",
    "Italian",
    "Japanese",
    "Kosher",
    "Mediterranean",
    "Mexican",
    "Middle%20Eastern",
    "Nordic",
    "South%20American",
    "South%20East%20Asian",
  ];
  const breakfastCuisines = [
    "American",
    "British",
    "French",
    "Italian",
    "Mediterranean",
    "Japanese",
    "Nordic",
    "Indian",
  ];
  const snackCuisines = [
    "American",
    "Mexican",
    "Mediterranean",
    "Asian",
    "Japanese",
    "South%20American",
    "Middle%20Eastern",
    "Indian",
  ];

  // Types de plats
  const dishTypeBreakfast = [
    "Cereals",
    "Bread",
    "Pancake",
    "Drinks",
    "Biscuits%20and%20cookies",
  ];
  const dishTypeLunch = [
    "Main%20course",
    "Salad",
    "Sandwiches",
    "Soup",
    "Side%20dish",
  ];
  const dishTypeDinner = [
    "Main%20course",
    "Side%20dish",
    "Soup",
    "Starter",
    "Salad",
  ];
  const dishTypeSnack = [
    "Biscuits%20and%20cookies",
    "Drinks",
    "Sandwiches",
    "Desserts",
    "Preserve",
  ];

  //jours de la semaine
  const daysOfWeek = ["monday", "tuesday"]; //Pour des raisons d'

  const fetchRecipesMealPlan = async (
    calories: number,
    mealType: string,
    dishType: string,
    cuisineType: string = ""
  ) => {
    const extremum = calories * 0.01;
    const minCal = calories - extremum;
    const maxCal = calories + extremum;

    let url = "";
    // URL de l'API avec les filtres fournis
    if (cuisineType !== "") {
      url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}&mealType=${mealType}&calories=${minCal}-${maxCal}&random=true&dishType=${dishType}&cuisineType=${cuisineType}`;
    } else {
      url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}&mealType=${mealType}&calories=${minCal}-${maxCal}&random=true&dishType=${dishType}`;
    }
    console.log(url);

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.hits;
    } catch (error) {
      console.error("Erreur lors de la récupération des recettes:", error);
    }
  };

  useEffect(() => {
    if (!isFeteched) {
      console.log("is feteched haut : ", isFeteched);
      const handleFetchRecipes = async () => {
        for (const dayName of daysOfWeek) {
          const day = week.getDay(dayName);

          const recipesBreakfast = await fetchRecipesMealPlan(
            nbCalBreakfast,
            "Breakfast",
            dishTypeBreakfast[
              Math.floor(Math.random() * dishTypeBreakfast.length)
            ]
          );
          day.breakfast = recipesBreakfast;

          const recipesLunch = await fetchRecipesMealPlan(
            nbCalLunch,
            "Lunch",
            dishTypeLunch[Math.floor(Math.random() * dishTypeLunch.length)],
            cuisineType[Math.floor(Math.random() * cuisineType.length)]
          );
          day.lunch = recipesLunch;

          const recipesDinner = await fetchRecipesMealPlan(
            nbCalDinner,
            "Dinner",
            dishTypeDinner[Math.floor(Math.random() * dishTypeDinner.length)]
          );
          day.dinner = recipesDinner;

          const recipesSnack = await fetchRecipesMealPlan(
            nbCalSnack,
            "Snack",
            dishTypeSnack[Math.floor(Math.random() * dishTypeSnack.length)]
          );
          day.snack = recipesSnack;
        }
        setIsFetched(true);
        console.log("is feteched bas : ", isFeteched);
      };
      handleFetchRecipes();
    }
  }, [nbCalBreakfast, nbCalLunch, nbCalDinner, nbCalSnack]);

  console.log("week : ", week);

  return (
    <div>
      {week.getDay("monday").breakfast ? (
        <>
          <h1>Recettes du petit déjeuner</h1>
          <p>{week.getDay("monday").breakfast}</p>
        </>
      ) : (
        <h1>Chargement...</h1>
      )}
    </div>
  );
}

export default MealPlan;
