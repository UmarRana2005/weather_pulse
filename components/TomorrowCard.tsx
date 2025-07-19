import React from "react";
import WeatherIllustration from "./WeatherIllustration";
import { TodayForecastData } from "@/types/todayForecast";

const TomorrowCard = ({ data }: { data: TodayForecastData }) => {
  return (
    <>
      <div className="w-full md:w-[270px] flex  flex-col gap-7 justify-between p-4 rounded-2xl shadow-md bg-background text-foreground border border-border transition-all duration-300  relative">
        <h2 className="text-lg font-semibold text-foreground mb-3">Tomorrow</h2>
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-semibold">
            {Math.round(data.list[8].main.temp)}°C
          </h2>
          <span className="px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground">
            {data.list[9].weather[0].main}
          </span>
        </div>
        <div className="hidden md:block w-1/2 mx-auto absolute top-10 right-5">
          <WeatherIllustration condition={data.list[9].weather[0].main} />
        </div>
      </div>
    </>
  );
};

export default TomorrowCard;
