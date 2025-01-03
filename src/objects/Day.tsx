class Day {
  private _date: string;
  private _breakfast: any[] = [];
  private _lunch: any[] = [];
  private _dinner: any[] = [];
  private _snack: any[] = [];

  constructor(date: string) {
    this._date = date;
  }

  get date() {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }

  get breakfast() {
    return this._breakfast;
  }

  set breakfast(value: any[]) {
    this._breakfast = value;
  }

  get lunch() {
    return this._lunch;
  }

  set lunch(value: any[]) {
    this._lunch = value;
  }

  get dinner() {
    return this._dinner;
  }

  set dinner(value: any[]) {
    this._dinner = value;
  }

  get snack() {
    return this._snack;
  }

  set snack(value: any[]) {
    this._snack = value;
  }
}

export default Day;
