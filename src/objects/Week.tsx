import Day from "./Day";

class Week {
    private _numWeek: number;
    private _days: { [key: string]: Day }; // Utiliser un objet pour associer les jours à leurs noms

    constructor(numWeek: number) {
        this._numWeek = numWeek;
        this._days = {
            monday: new Day("Monday"),
            tuesday: new Day("Tuesday"),
            wednesday: new Day("Wednesday"),
            thursday: new Day("Thursday"),
            friday: new Day("Friday"),
            saturday: new Day("Saturday"),
            sunday: new Day("Sunday"),
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