"use client";
import React, { useState } from "react";
import Image from "next/image";
import Avatar from "../public/avatar.jpg";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import AirQualityCard from "./AirQualityCard";
import useLocation from "@/hooks/useLocation";
import TemperatureCard from "./TemperatureCard";
import SkeletonCard from "./SkeletonCard";
import TodayChart from "./TodayChart";
import TomorrowCard from "./TomorrowCard";
import useWeather from "@/hooks/useWeather";
import useAirQuality from "@/hooks/useAirQuality";
import useTodayForecast from "@/hooks/useTodayForecast";
import Aside from "./Aside";

const Dashboard = () => {
  const [search, setSearch] = useState("Lahore");
  const { data, error, isLoading } = useLocation(search);
  const { data: weatherData } = useWeather(search);
  const cityData = data?.[0]; // Check if first entry exists
  const { data: aqiData } = useAirQuality(
    cityData?.lat || 31.5497,
    cityData?.lon || 74.3436,
    cityData?.name || "Lahore"
  );
  const { data: ForcastData } = useTodayForecast(search);
  return (
    <div className="flex gap-3 items-start justify-center">
      <div className="flex flex-col gap-3 items-start justify-start px-2 py-2">
        {/* Header */}
        <div className="w-[750px] flex justify-between items-start gap-3">
          <div className="flex justify-center items-center gap-3">
            <div className="size-14 relative">
              <Image
                src={Avatar}
                alt="Avatar"
                fill
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            </div>
            <div className="flex items-start justify-center flex-col">
              <h1 className="text-lg">Hello,</h1>
              <h2 className="text-lg font-semibold">Umar Rana</h2>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <SearchBar onSearch={(search) => setSearch(search)} />
            <ThemeToggle />
          </div>
        </div>

        {/* Weather Cards */}
        <div className="flex gap-2">
          {isLoading ? (
            <>
              <SkeletonCard className="w-[370px] h-[255px]" />
              <SkeletonCard className="w-[370px] h-[255px]" />
            </>
          ) : error || !cityData ? (
            <>
              <SkeletonCard error={error} className="w-[370px] h-[255px]" />
              <SkeletonCard error={error} className="w-[370px] h-[255px]" />
            </>
          ) : (
            <>
              {weatherData && <TemperatureCard weatherData={weatherData} />}
              {aqiData && weatherData && (
                <AirQualityCard weatherData={weatherData} aqiData={aqiData} />
              )}
            </>
          )}
        </div>
        <div className="flex gap-2">
          {isLoading ? (
            <>
              <SkeletonCard className="w-[450px] h-[255px]" />
              <SkeletonCard className="w-[278px] h-[255px]" />
            </>
          ) : error || !cityData ? (
            <>
              <SkeletonCard error={error} className="w-[450px] h-[255px]" />
              <SkeletonCard error={error} className="w-[278px] h-[255px]" />
            </>
          ) : (
            <>
              {ForcastData && (
                <>
                  <TodayChart data={ForcastData} />
                  <TomorrowCard data={ForcastData} />
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="h-full">
        {isLoading ? (
          <>
            <SkeletonCard className="min-w-[250px] max-w-[300px] h-full" />
          </>
        ) : error || !cityData ? (
          <>
            <SkeletonCard
              error={error}
              className="min-w-[250px] max-w-[300px] h-full"
            />
          </>
        ) : (
          <>
            {ForcastData && weatherData && (
              <Aside weatherData={weatherData} forecastData={ForcastData} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
