export interface Timeline {
  updated_at: Date;
  date: string;
  deaths: number;
  confirmed: number;
  recovered: number;
  new_confirmed: number;
  new_recovered: number;
  new_deaths: number;
  active: number;
}
