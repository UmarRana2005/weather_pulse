import { weatherConditions } from "./weatherConditions";

export interface TodayForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level: number;
      grnd_level: number;
    };
    weather: {
      id: number;
      main: weatherConditions | string;
      description: string;
      icon: string;
    }[];
    dt_txt: string;
  }[];
}
