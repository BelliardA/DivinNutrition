import UserInterface from "../types/UserInterface";
import {
  ActivityLevel,
  ProfessionalActivity,
  Sexe,
  // DishTypeBreakfast,
  BreakfastCuisineType,
} from "./Constants";
const appId = import.meta.env.VITE_EDAMAM_APP_ID;
const appKey = import.meta.env.VITE_EDAMAM_APP_KEY;

class User {

  private _name: string;
  private _age: number;
  private _weight: number;
  private _height: number;
  private _activity: ActivityLevel;
  private _sexe: Sexe;
  private _activityPro: ProfessionalActivity;

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
  get name() {
    return this._name;
  }

  get age() {
    return this._age;
  }

  get weight() {
    return this._weight;
  }

  get height() {
    return this._height;
  }

  get activity() {
    return this._activity;
  }

  get sexe() {
    return this._sexe;
  }

  get activityPro() {
    return this._activityPro;
  }

  getProperties(): UserInterface{
    return {
      name : this._name,
      age : this._age,
      weight : this._weight,
      height : this._height,
      activity : this._activity,
      sexe : this._sexe,
      activityPro : this._activityPro
    }
  }

  calculateCalories(): number {
    const baseCalories =
      this.sexe === Sexe.Homme
        ? 10 * this.weight + 6.25 * this.height - 5 * this.age + 5
        : 10 * this.weight + 6.25 * this.height - 5 * this.age - 161;
    const activityMultiplier = {
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

    const cuisineTypes = Object.values(BreakfastCuisineType);
    // const dishTypes = Object.values(DishTypeBreakfast);

    // Génération aléatoire des types avec le bon typage
    const randomCuisineType = cuisineTypes[
      Math.floor(Math.random() * cuisineTypes.length)
    ] as BreakfastCuisineType;
    // const randomDishType = dishTypes[
    //   Math.floor(Math.random() * dishTypes.length)
    // ] as DishTypeBreakfast;

    const url = `https://api.edamam.com/api/recipes/v2?type=public&mealType=Breakfast&random=true&app_id=${appId}&app_key=${appKey}&calories=${minCal}-${maxCal}&cuisineType=${randomCuisineType}`;

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
    const totalCalories = this.calculateCalories();
    const protein = Math.round((totalCalories * 0.15) / 4);
    const glucides = Math.round((totalCalories * 0.55) / 4);
    const lipids = Math.round((totalCalories * 0.3) / 9);

    return {protein, glucides, lipids};
  }
}

export default User;
