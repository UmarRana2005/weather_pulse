export interface ChartData {
  label: DayTime;
  temp: number;
  icon: string;
}

export enum DayTime {
  morning = "Morning",
  afternoon = "Afternoon",
  evening = "Evening",
  night = "Night",
}
