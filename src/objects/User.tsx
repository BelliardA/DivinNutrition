class User {
    private _name: string;
    private _age: number;
    private _weight: number;
    private _height: number;
    private _activity: number;
    private _sexe: boolean;
    private _activityPro: number;

    constructor(name: string, age: number, weight: number, height: number, activity: number, sexe: boolean, activityPro: number) {
        this._name = name;
        this._age = age;
        this._weight = weight;
        this._height = height;
        this._activity = activity;  // 1 = sédentaire, 2 = peu actif, 3 = actif, 4 = très actif
        this._sexe = sexe; // true = homme, false = femme
        this._activityPro = activityPro; // 1 = sedentaire, 2 = modéré, 3 = actif
    }

    get name() {
        return this._name;
    }
    set name(value: string) {
        this._name = value;
    }

    get age() {
        return this._age;
    }
    set age(value: number) {
        this._age = value;
    }

    get weight() {
        return this._weight;
    }
    set weight(value: number) {
        this._weight = value;
    }

    get height() {
        return this._height;
    }
    set height(value: number) {
        this._height = value;
    }

    get activity() {
        return this._activity;
    }
    set activity(value: number) {
        this._activity = value;
    }
    get sexe() {
        return this._sexe;
    }
    set sexe(value: boolean) {
        this._sexe = value;
    }

    // Méthode pour calculer les calories
    calculateCalories(): number {
        let calorie: number;
        if (this._activity === 1) {
            calorie = 10 * this._weight + 6.25 * this._height - 5 * this._age + 5;
        } else {
            calorie = 10 * this._weight + 6.25 * this._height - 5 * this._age - 161;
        }

        switch (this._activity) {
            case 1:
                calorie *= 1.2;
                break;
            case 2:
                calorie *= 1.375;
                break;
            case 3:
                calorie *= 1.55;
                break;
            case 4:
                calorie *= 1.725;
                break;
        }

        return Math.round(calorie);
    }

    // Méthode pour calculer les calories pour chaque repas
    calculateCaloriesPerMeal(calorie: number): { breakfast: number, lunch: number, dinner: number, snack: number } {
        return {
            breakfast: Math.round(calorie * 0.3),
            lunch: Math.round(calorie * 0.4),
            dinner: Math.round(calorie * 0.25),
            snack: Math.round(calorie * 0.05)
        };
    }


}

export default User;