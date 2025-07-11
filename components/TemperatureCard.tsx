import React from "react";
import OpenWeatherIcon from "@/lib/OpenWeatherIcon";
import WeatherIllustration from "./WeatherIllustration";
import useWeather from "@/hooks/useWeather";
import { Skeleton } from "./ui/skeleton";

const TemperatureCard = ({ city }: { city: string }) => {
  const { data: weatherData } = useWeather(city);

  return (
    //width 360px
    <>
      {weatherData && (
        <div className="w-[370px] flex flex-col md:flex-row justify-between items-center gap-6 p-6 rounded-2xl shadow-md bg-background text-foreground relative border border-border transition-all duration-300">
          {/* Left: Weather Info */}
          <div className="flex-1 flex flex-col gap-5">
            {/* Header: Icon + City Name */}
            <div className="flex items-center gap-3">
              <div className="grid place-content-center p-2 bg-muted rounded-full">
                <OpenWeatherIcon src={weatherData.weather[0].icon} />
              </div>
              <div>
                <p className="text-xl font-bold capitalize">
                  {weatherData.name}
                </p>
                <p className="text-sm font-medium capitalize text-muted-foreground">
                  {weatherData.weather[0].description}
                </p>
              </div>
            </div>

            {/* Temperature */}
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-extrabold">
                {Math.round(weatherData.main.temp)}°C
              </h2>
              <span className="px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground">
                Feels like {Math.round(weatherData.main.feels_like)}°C
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center bg-primary text-primary-foreground rounded-xl p-3 shadow-sm">
                <span className="text-sm font-medium">Pressure</span>
                <span className="text-lg font-semibold">
                  {Math.round(weatherData.main.pressure)} mb
                </span>
              </div>
              <div className="flex flex-col items-center bg-orange-200 dark:bg-orange-800 text-black dark:text-white rounded-xl p-3 shadow-sm">
                <span className="text-sm font-medium">Visibility</span>
                <span className="text-lg font-semibold">
                  {Math.round(weatherData.visibility / 1000)} km
                </span>
              </div>
              <div className="flex flex-col items-center bg-muted text-muted-foreground rounded-xl p-3 shadow-sm">
                <span className="text-sm font-medium">Humidity</span>
                <span className="text-lg font-semibold">
                  {weatherData.main.humidity}%
                </span>
              </div>
            </div>
          </div>

          {/* Right: Decorative Image */}
          <div className="absolute hidden md:block flex-shrink-0 top-0 right-0">
            <WeatherIllustration condition={weatherData.weather[0].main} />
          </div>
        </div>
      )}
    </>
  );
};

export default TemperatureCard;

export const TemperatureSkeleton = () => {
  return <Skeleton className="w-[370px] h-[255px] rounded-xl" />;
};
