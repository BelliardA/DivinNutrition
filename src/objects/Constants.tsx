//Les const de l'app

export enum ActivityLevel {
    None = 0,               // Aucune activité
    Sedentary = 1,       // Correspond au niveau sédentaire
    LightlyActive = 2,       // Peu actif
    Active = 3,              // Actif
    VeryActive = 4          // Très acti
}

export enum Sexe {
    Homme = "Homme",
    Femme = "Femme",
    None = ""
}

export enum ProfessionalActivity {
    Sedentary = 1,       // Activité professionnelle sédentaire
    Moderate = 2,            // Modérée
    Active = 3,               // Active
    None = 0
}
export enum MealType {
    Breakfast = 'breakfast',
    Lunch = 'lunch',
    Dinner = 'dinner',
    Snack = 'snack'
  }

  export enum Days {
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
    Sunday = "Sunday"
  }

  //----------------------------------------------------Alimentation ----------------------------------------------------
  export enum DishTypeBreakfast {
    Cereals = "Cereals",
    Bread = "Bread",
    Pancake = "Pancake",
    Drinks = "Drinks",
    BiscuitsAndCookies = "Biscuits%20and%20cookies",
  }
  
  export enum DishTypeLunch {
    MainCourse = "Main%20course",
    Salad = "Salad",
    Sandwiches = "Sandwiches",
    Soup = "Soup",
    SideDish = "Side%20dish",
  }
  
  export enum DishTypeDinner {
    MainCourse = "Main%20course",
    SideDish = "Side%20dish",
    Soup = "Soup",
    Starter = "Starter",
    Salad = "Salad",
  }

  export enum CuisineType {
    American = 'american',
    Asian = 'asian',
    British = 'british',
    Caribbean = 'caribbean',
    CentralEurope = 'central europe',
    Chinese = 'chinese',
    EasternEurope = 'eastern europe',
    French = 'french',
    Indian = 'indian',
    Italian = 'italian',
    Japanese = 'japanese',
    Kosher = 'kosher',
    Mediterranean = 'mediterranean',
    Mexican = 'mexican',
    MiddleEastern = 'middle eastern',
    Nordic = 'nordic',
    SouthAmerican = 'south american',
    SouthEastAsian = 'south east asian'
  }
  
  export enum BreakfastCuisineType {
    American = "American",
    British = "British",
    French = "French",
    Italian = "Italian",
    Mediterranean = "Mediterranean",
    Japanese = "Japanese",
    Nordic = "Nordic",
    Indian = "Indian",
  }

  export enum DaysOfWeek {
    Monday = "monday",
    Tuesday = "tuesday",
    Wednesday = "wednesday",
    Thursday = "thursday",
    Friday = "friday",
    Saturday = "saturday",
    Sunday = "sunday"
  }