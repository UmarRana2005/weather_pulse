import { TodayForecastData } from "./../types/todayForecast";
import useData from "./useData";

const useTodayForecast = (selectedCity: string) =>
  useData<TodayForecastData>(
    "/data/2.5/forecast",
    { params: { q: selectedCity } },
    selectedCity
  );

export default useTodayForecast;
