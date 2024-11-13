import Day from "./Day";

class Week {
    private _numWeek: number;
    private _days: { [key: string]: Day }; // Utiliser un objet pour associer les jours à leurs noms

    constructor(numWeek: number) {
        this._numWeek = numWeek;
        this._days = {
            monday: new Day(),
            tuesday: new Day(),
            wednesday: new Day(),
            thursday: new Day(),
            friday: new Day(),
            saturday: new Day(),
            sunday: new Day(),
        };
    }

    get numWeek() {
        return this._numWeek;
    }

    set numWeek(value: number) {
        this._numWeek = value;
    }

    // Getter pour un jour spécifique par son nom
    getDay(dayName: string): Day {
        return this._days[dayName];
    }

    // Setter pour un jour spécifique par son nom
    setDay(dayName: string, day: Day) {
        this._days[dayName] = day;
    }

    // Optionnel : Getter pour tous les jours si nécessaire
    get days() {
        return this._days;
    }
}

export default Week;