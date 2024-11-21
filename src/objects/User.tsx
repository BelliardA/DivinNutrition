import { ActivityLevel, ProfessionalActivity, Sexe } from './Constants';
const appId = import.meta.env.VITE_EDAMAM_APP_ID;
const appKey = import.meta.env.VITE_EDAMAM_APP_KEY;

class User {
    private _calories?: number;

    constructor(
        private _name: string,
        private _age: number,
        private _weight: number,
        private _height: number,
        private _activity: ActivityLevel,
        private _sexe: Sexe,
        private _activityPro: ProfessionalActivity
    ) {}

    

    //Getter pour les valeur qui seront afficher
    get calories() {
        return this.calculateCalories();
    }
    get name() {
        return this._name;
    }

    calculateCalories(): number {
        const baseCalories =
            this._sexe === Sexe.Homme
                ? 10 * this._weight + 6.25 * this._height - 5 * this._age + 5
                : 10 * this._weight + 6.25 * this._height - 5 * this._age - 161;

        const activityMultiplier = {
            [ActivityLevel.Sedentary]: 1.2,
            [ActivityLevel.LightlyActive]: 1.375,
            [ActivityLevel.Active]: 1.55,
            [ActivityLevel.VeryActive]: 1.725,
        }[this._activity];

        return Math.round(baseCalories * activityMultiplier);
    }

    splitCaloriesByMeal(): { breakfast: number; lunch: number; dinner: number; snack: number } {
        const totalCalories = this.calculateCalories();
        return {
            breakfast: Math.round(totalCalories * 0.3),
            lunch: Math.round(totalCalories * 0.4),
            dinner: Math.round(totalCalories * 0.25),
            snack: Math.round(totalCalories * 0.05),
        };
    }

    createUrlBreakFast(): string {
        const calorie = this.splitCaloriesByMeal().breakfast;
        const precision = calorie * 0.02;
        const minCal = calorie - precision;
        const maxCal = calorie + precision;

        return  `https://api.edamam.com/api/recipes/v2?type=public&mealType=Breakfast&random=true&app_id=${appId}&app_key=${appKey}&calories=${minCal}-${maxCal}`

        
    }

    createUrlLunch(): string {
        const calorie = this.splitCaloriesByMeal().lunch;
        const precision = calorie * 0.02;
        const minCal = calorie - precision;
        const maxCal = calorie + precision;

        return `https://api.edamam.com/api/recipes/v2?type=public&mealType=Lunch&random=true&app_id=${appId}&app_key=${appKey}&calories=${minCal}-${maxCal}`

        
    }

    createUrlDinner(): string {
        const calorie = this.splitCaloriesByMeal().dinner;
        const precision = calorie * 0.02;
        const minCal = calorie - precision;
        const maxCal = calorie + precision;

        return `https://api.edamam.com/api/recipes/v2?type=public&mealType=Dinner&random=true&app_id=${appId}&app_key=${appKey}&calories=${minCal}-${maxCal}`

        
    }
}

export default User;