export interface WeatherData {
  name: string;
  dt: number;
  timezone: number;
  id: number;
  cod: number;
  base: string;
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
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };

  clouds: {
    all: number;
  };
}
