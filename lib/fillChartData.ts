import { ChartData } from "./../types/chartData";
import { TodayForecastData } from "@/types/todayForecast";
import { getHour } from "./getHour";
import { getDayTime } from "./getDayTime";

export const fillChartData = (weatherData: TodayForecastData): ChartData[] => {
  if (!weatherData || !Array.isArray(weatherData.list)) return [];

  const chartData: ChartData[] = [];

  for (let i = 0; i < weatherData.list.length; i += 2) {
    const item = weatherData.list[i];
    const label = getDayTime(getHour(item.dt_txt));
    const temp = item.main.temp;
    const icon = item.weather[0]?.icon || "01d";

    chartData.push({ label, temp, icon });
  }

  return chartData;
};
