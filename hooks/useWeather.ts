import { WeatherData } from "@/types/weather";
import useData from "./useData";

const useWeather = (selectedCity: string) =>
  useData<WeatherData>(
    "/data/2.5/weather",
    { params: { q: selectedCity } },
    selectedCity
  );

export default useWeather;
