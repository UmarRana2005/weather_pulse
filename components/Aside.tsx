"use client";
import React, { useEffect, useState } from "react";
import SunPathArc from "./SunArcPath";
import { WeatherData } from "@/types/weather";
import { TodayForecastData } from "@/types/todayForecast";
import PredictionCard from "./PredictionCard";
import { unixToOffsetTime } from "@/lib/unixToOffset";
import Image from "next/image";
import Night from "../public/night.png";
const Aside = ({
  weatherData,
  forecastData,
}: {
  weatherData: WeatherData;
  forecastData: TodayForecastData;
}) => {
  const {
    name: cityName,
    sys: countryData,
    dt,
    main: mainWeather,
  } = weatherData;

  const { list: forecastList } = forecastData;

  const [cardData, setCardData] = useState<typeof forecastList>([]);
  const [isDay, setDay] = useState(true);
  useEffect(() => {
    const filtered = forecastList.filter(
      (_, index) => index % 8 === 0 && index !== 0
    );
    setCardData(filtered);
    if (countryData.sunrise > dt) {
      setDay(false);
    } else if (countryData.sunrise <= dt && countryData.sunset >= dt) {
      setDay(true);
    } else {
      setDay(false);
    }
  }, [forecastList, countryData, dt]);

  return (
    <div className="w-full md:w-[230px] h-fit flex flex-col items-center justify-start gap-3 px-4 py-2 bg-background rounded-md">
      {/* Header */}
      <div className="w-full flex justify-between items-center border-border border-b-2 py-2">
        <div className="flex flex-col gap-1 items-start justify-center">
          <h1 className="text-xl font-semibold">{isDay ? "Sun" : "Night"}</h1>
          <p className="text-xs text-muted-foreground">
            {cityName}, {countryData.country}
          </p>
        </div>
        <h1 className="font-bold text-3xl text-orange-300">
          {Math.round(mainWeather.temp)} °C
        </h1>
      </div>
      {isDay ? (
        <div className="w-full flex flex-col items-center justify-center px-2 relative mb-3">
          <SunPathArc
            sunrise={countryData.sunrise}
            sunset={countryData.sunset}
            currentTime={dt}
          />
          <div className="w-full lg:w-[120%] flex justify-between items-center absolute -bottom-4">
            <div className="flex flex-col items-center justify-center">
              <p className="text-base">Sunrise</p>
              <p className="text-xs text-muted-foreground">
                {unixToOffsetTime(
                  countryData.sunrise,
                  weatherData.timezone
                ).slice(26)}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-base">Sunset</p>
              <p className="text-xs text-muted-foreground">
                {unixToOffsetTime(
                  countryData.sunset,
                  weatherData.timezone
                ).slice(26)}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center px-2 relative mb-3">
          <Image
            src={Night}
            alt="Night Image"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div className="absolute -bottom-4 left-6 flex gap-2">
            <p className="text-base">
              Sunrise:{" "}
              <span className="text-muted-foreground">
                {unixToOffsetTime(
                  countryData.sunrise,
                  weatherData.timezone
                ).slice(26)}
              </span>
            </p>
          </div>
        </div>
      )}
      {/* Prediction Cards */}
      <div className="w-full flex flex-col justify-center items-start gap-5 py-2">
        <h1 className="text-xl font-semibold">Weather Prediction</h1>
        <div className="w-full flex flex-col gap-3 items-start justify-center">
          {cardData.slice(0, 3).map((item, index) => (
            <PredictionCard
              key={index}
              date={item.dt_txt}
              icon={item.weather[0].icon}
              weather={item.weather[0].main}
              temp={item.main.temp}
              feels={item.main.feels_like}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aside;
