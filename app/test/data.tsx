"use client";
import useWeather from "@/hooks/useWeather";
import Image from "next/image";
import React from "react";

const Data = () => {
  const { data, isLoading, error } = useWeather("Lahore");

  return (
    <div className="p-6">
      {isLoading && <p>Loading...</p>}
      {error && <p>Their is no city such that</p>}
      {data && (
        <div className="border rounded-xl shadow-sm p-4 bg-white dark:bg-neutral-900 space-y-2">
          <h2 className="text-xl font-semibold">
            {data.name}, {data.sys.country}
          </h2>

          <div className="flex items-center gap-3">
            <Image
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].description}
              width={60}
              height={60}
              className="w-12 h-12"
            />
            <p className="capitalize">{data.weather[0].description}</p>
          </div>

          <p>🌡 Temp: {data.main.temp}°C</p>
          <p>💧 Humidity: {data.main.humidity}%</p>
          <p>💨 Wind: {data.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Data;
