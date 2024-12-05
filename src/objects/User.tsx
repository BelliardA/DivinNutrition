import {
  ActivityLevel,
  ProfessionalActivity,
  Sexe,
  // DishTypeBreakfast,
  // BreakfastCuisineType,
} from "./Constants";
const appId = import.meta.env.VITE_EDAMAM_APP_ID;
const appKey = import.meta.env.VITE_EDAMAM_APP_KEY;

class User {

  public _name: string;
  public _age: number;
  public _weight: number;
  public _height: number;
  public _activity: ActivityLevel;
  public _sexe: Sexe;
  public _activityPro: ProfessionalActivity;

  constructor(
    user = 
    {
      name : "",
      age : 0,
      weight : 0,
      height : 0,
      activity : ActivityLevel.Sedentary,
      sexe : Sexe.Homme,
      activityPro : ProfessionalActivity.Sedentary
    }
  ) {
    this._name = user.name;
    this._age = user.age;
    this._weight = user.weight;
    this._height = user.height;
    this._activity = user.activity;
    this._sexe = user.sexe;
    this._activityPro = user.activityPro;
  }

  //Getter pour les valeur qui seront afficher
  get calories() {
    return this.calculateCalories();
  }

  calculateCalories(): number {
    const baseCalories =
      this._sexe === Sexe.Homme
        ? 10 * this._weight + 6.25 * this._height - 5 * this._age + 5
        : 10 * this._weight + 6.25 * this._height - 5 * this._age - 161;
    const activityMultiplier = {
      [ActivityLevel.None]: 1.1,
      [ActivityLevel.Sedentary]: 1.2,
      [ActivityLevel.LightlyActive]: 1.375,
      [ActivityLevel.Active]: 1.55,
      [ActivityLevel.VeryActive]: 1.725,
    }[this._activity];
    return Math.round(baseCalories * activityMultiplier);
  }

  splitCaloriesByMeal(): {
    breakfast: number;
    lunch: number;
    dinner: number;
    snack: number;
  } {
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

    // const cuisineTypes = Object.values(BreakfastCuisineType);
    // const dishTypes = Object.values(DishTypeBreakfast);

    // Génération aléatoire des types avec le bon typage
    // const randomCuisineType = cuisineTypes[
    //   Math.floor(Math.random() * cuisineTypes.length)
    // ] as BreakfastCuisineType;
    // const randomDishType = dishTypes[
    //   Math.floor(Math.random() * dishTypes.length)
    // ] as DishTypeBreakfast;

    const url = `https://api.edamam.com/api/recipes/v2?type=public&mealType=Breakfast&random=true&app_id=${appId}&app_key=${appKey}&calories=${minCal}-${maxCal}`;

    return url;
  }

  createUrlLunch(): string {
    const calorie = this.splitCaloriesByMeal().lunch;
    const precision = calorie * 0.02;
    const minCal = calorie - precision;
    const maxCal = calorie + precision;

    return `https://api.edamam.com/api/recipes/v2?type=public&mealType=Lunch&random=true&app_id=${appId}&app_key=${appKey}&calories=${minCal}-${maxCal}`;
  }

  createUrlDinner(): string {
    const calorie = this.splitCaloriesByMeal().dinner;
    const precision = calorie * 0.02;
    const minCal = calorie - precision;
    const maxCal = calorie + precision;

    return `https://api.edamam.com/api/recipes/v2?type=public&mealType=Dinner&random=true&app_id=${appId}&app_key=${appKey}&calories=${minCal}-${maxCal}`;
  }

  nessesaryMacroNutr() {
    const protein = Math.round((this._weight * 2));   //2g par kilo
    const lipids = Math.round((this._weight * 0.8));   //0.8g par kilo
    const glucides = lipids + protein ;

    return {protein, glucides, lipids};
  }
}

export default User;
