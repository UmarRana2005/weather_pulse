import React from "react";
import Image from "next/image";
import { WeatherData } from "@/types/weather";
import OpenWeatherIcon from "@/lib/OpenWeatherIcon";

const TemperatureCard = ({ data }: { data: WeatherData }) => {
  const { weather, main, visibility, name } = data;

  return (
    //width 360px
    <div className="w-full max-w-2xl flex flex-col md:flex-row justify-between items-center gap-6 p-6 rounded-2xl shadow-md bg-background text-foreground relative border border-border transition-all duration-300">
      {/* Left: Weather Info */}
      <div className="flex-1 flex flex-col gap-5">
        {/* Header: Icon + City Name */}
        <div className="flex items-center gap-3">
          <div className="grid place-content-center p-2 bg-muted rounded-full">
            <OpenWeatherIcon src={weather[0].icon} />
          </div>
          <div>
            <p className="text-2xl font-bold capitalize">{name}</p>
            <p className="text-sm font-medium capitalize text-muted-foreground">
              {weather[0].description}
            </p>
          </div>
        </div>

        {/* Temperature */}
        <div className="flex items-center gap-4">
          <h2 className="text-4xl font-extrabold">{Math.round(main.temp)}°C</h2>
          <span className="px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground">
            Feels like {Math.round(main.feels_like)}°C
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center bg-primary text-primary-foreground rounded-xl p-3 shadow-sm">
            <span className="text-sm font-medium">Pressure</span>
            <span className="text-lg font-semibold">
              {Math.round(main.pressure)} mb
            </span>
          </div>
          <div className="flex flex-col items-center bg-orange-200 dark:bg-orange-800 text-black dark:text-white rounded-xl p-3 shadow-sm">
            <span className="text-sm font-medium">Visibility</span>
            <span className="text-lg font-semibold">
              {Math.round(visibility / 1000)} km
            </span>
          </div>
          <div className="flex flex-col items-center bg-muted text-muted-foreground rounded-xl p-3 shadow-sm">
            <span className="text-sm font-medium">Humidity</span>
            <span className="text-lg font-semibold">{main.humidity}%</span>
          </div>
        </div>
      </div>

      {/* Right: Decorative Image */}
      <div className="absolute hidden md:block flex-shrink-0 top-0 right-0">
        <Image
          src="/weather-conditions/sunny.png"
          alt="Rainy Weather Illustration"
          width={150}
          height={150}
          className="object-contain opacity-90 dark:opacity-80"
        />
      </div>
    </div>
  );
};

export default TemperatureCard;
