import { MealType } from "../objects/Constants";
import User from "../objects/User";
import Week from "../objects/Week";

import MealPlan from "../store/MealPlan";

import { CuisineType, BreakfastCuisineType, DishTypeBreakfast, DishTypeDinner, DishTypeLunch } from "../objects/Constants";

import { useEffect, useState } from "react";

const appId = import.meta.env.VITE_EDAMAM_APP_ID;
const appKey = import.meta.env.VITE_EDAMAM_APP_KEY;

const userFetchMeal = (user: User) => { 
    const [loading, setLoading] = useState(false);
    const { week, setWeek, updateMeal } = MealPlan();

    useEffect(() => {
        const fetchmeal = async (
            day: string,
            whatMeal: number,
            mealType: string,
            dishType: string,
            cuisineType?: string
        ) => {
            //il faut refaire le calcul des 
            const precision = user.calories* 0.02;  // Précision à 2% près
            const minCal = user.calories - precision;
            const maxCal = user.calories + precision;

            let url = "";

            if (cuisineType) {
                url = `https://api.edamam.com/search?q=${dishType}&app_id=${appId}&app_key=${appKey}&mealType=${mealType}&calories=${minCal}-${maxCal}&cuisineType=${cuisineType}`;
            } else {
                url = `https://api.edamam.com/search?q=${dishType}&app_id=${appId}&app_key=${appKey}&mealType=${mealType}&calories=${minCal}-${maxCal}`;
            }

            try {
                const response = await fetch(url);
                const data = await response.json();
                
                const mealData = data.hits[0];
                if (mealData) {
                    switch (whatMeal) { // 0 = Breakfast, 1 = Lunch, 2 = Dinner
                        case 0:
                            updateMeal(day, MealType.Breakfast, mealData);
                            break;
                        case 1:
                            updateMeal(day, MealType.Lunch, mealData);
                            break;
                        case 2:
                            updateMeal(day, MealType.Dinner, mealData);
                            break;
                    }
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des recettes:", error);
            }
        }

        setLoading(true);
        const newWeek = new Week(1);
        setWeek(newWeek);

        const days = Object.keys(newWeek.days);
        let index = 0; // Utilisé pour savoir quand envoyer la prochaine requête
        const intervalDelay = 6010;  // Délai entre chaque itération

        // Fonction pour envoyer les requêtes espacées
        const sendRequests = () => {
            if (index < days.length) {  // Si nous avons encore des jours à traiter
                const day = days[index];
                const randomDishTypeBreakfast = Object.values(DishTypeBreakfast)[
                    Math.floor(Math.random() * Object.values(DishTypeBreakfast).length)
                ];
                const randomDishTypeLunch = Object.values(DishTypeLunch)[
                    Math.floor(Math.random() * Object.values(DishTypeLunch).length)
                ];
                const randomDishTypeDinner = Object.values(DishTypeDinner)[
                    Math.floor(Math.random() * Object.values(DishTypeDinner).length)
                ];
                const randomCuisineType = Object.values(CuisineType)[
                    Math.floor(Math.random() * Object.values(CuisineType).length)
                ];
                const randomBreakfastCuisineType = Object.values(BreakfastCuisineType)[
                    Math.floor(Math.random() * Object.values(BreakfastCuisineType).length)
                ];
        
                // Appel de la fonction pour chaque repas
                fetchmeal(day, 0, MealType.Breakfast, randomDishTypeBreakfast, randomBreakfastCuisineType);
                fetchmeal(day, 1, MealType.Lunch, randomDishTypeLunch, randomCuisineType);
                fetchmeal(day, 2, MealType.Dinner, randomDishTypeDinner, randomCuisineType);
        
                // Appeler setTimeout après avoir traité les trois repas
                setTimeout(sendRequests, intervalDelay);
                // On augmente l'index pour passer au jour suivant
                index++;
            }
        };

        sendRequests(); // Démarre l'envoi des requêtes espacées

        return () => {
            // Nettoyage (bien que `setTimeout` ne nécessite pas de nettoyage, si vous utilisez `setInterval` ça peut être utile)
        };
    }, [user, setWeek, updateMeal]);

    return { loading };
};

export default userFetchMeal;