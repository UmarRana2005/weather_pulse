import { getMonthName } from "@/constants/months";
import OpenWeatherIcon from "@/lib/OpenWeatherIcon";
import React from "react";
interface Props {
  date: string;
  icon: string;
  weather: string;
  temp: number;
  feels: number;
}
const PredictionCard = ({ date, icon, weather, temp, feels }: Props) => {
  return (
    <div className="w-full flex gap-4 items-center justify-start bg-muted rounded-md p-3">
      <div className="grid place-content-center p-2">
        <OpenWeatherIcon src={icon} />
      </div>
      <div className="flex flex-col items-start justify-center gap-0">
        <p className="text-xs text-muted-foreground">
          {getMonthName(Number.parseInt(date.slice(5, 7)))} {date.slice(8, 10)}
        </p>
        <p className="text-lg font-semibold">{weather}</p>
      </div>
      <div className="flex items-start justify-center gap-1">
        <p className="text-xs text-muted-foreground">
          {Math.round(temp)}/{Math.round(feels)} °C
        </p>
      </div>
    </div>
  );
};

export default PredictionCard;
