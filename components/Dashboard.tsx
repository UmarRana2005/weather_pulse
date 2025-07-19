"use client";
import React, { useEffect, useState } from "react";
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
  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
  } = useLocation(search);
  const {
    data: weatherData,
    error: weatherError,
    isLoading: weatherLoading,
  } = useWeather(search);
  const cityData = searchData?.[0]; // Check if first entry exists
  const {
    data: aqiData,
    error: aqiError,
    isLoading: aqiLoading,
  } = useAirQuality(
    cityData?.lat || 31.5497,
    cityData?.lon || 74.3436,
    cityData?.name || "Lahore"
  );
  const {
    data: ForcastData,
    error: forecastError,
    isLoading: forecastLoading,
  } = useTodayForecast(search);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    setLoading(
      searchLoading || weatherLoading || aqiLoading || forecastLoading
    );
    if (searchError || weatherError || aqiError || forecastError) {
      setError("No City Found or Connection Failed ");
    } else {
      setError("");
    }
  }, [
    searchLoading,
    weatherLoading,
    aqiLoading,
    forecastLoading,
    searchError,
    weatherError,
    aqiError,
    forecastError,
  ]);
  return (
    <div className="flex flex-1 flex-wrap gap-3 items-center justify-center bg-pinak-300">
      <div className="flex flex-col gap-3 items-start justify-start px-2 py-2">
        {/* Header */}
        <div className="w-full flex justify-between items-start gap-3">
          <div className="flex justify-center items-center gap-3">
            <div className="size-10 lg:size-14 relative">
              <Image
                src={Avatar}
                alt="Avatar"
                fill
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            </div>
            <div className="hidden md:flex items-start justify-center flex-col">
              <h1 className="text-base lg:text-lg">Hello,</h1>
              <h2 className="text-base font-semibold">Umar Rana</h2>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <SearchBar onSearch={(search) => setSearch(search)} />
            <ThemeToggle />
          </div>
        </div>
        {loading ? (
          <>
            <div className="flex flex-wrap gap-2">
              <SkeletonCard className="w-[330px] md:w-[360px] h-[255px]" />
              <SkeletonCard className="w-[330px] md:w-[360px] h-[255px]" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <SkeletonCard className="w-[330px] md:w-[450px] h-[255px]" />
              <SkeletonCard className="w-[330px] md:w-[270px] h-[255px]" />
            </div>
          </>
        ) : error ? (
          <>
            <div className="flex flex-wrap gap-2 ">
              <SkeletonCard
                error={error}
                className="w-[330px] md:w-[360px] h-[255px]"
              />
              <SkeletonCard
                error={error}
                className="w-[330px] md:w-[360px] h-[255px]"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <SkeletonCard
                error={error}
                className="w-[330px] md:w-[450px] h-[255px]"
              />
              <SkeletonCard
                error={error}
                className="w-[330px] md:w-[270px] h-[255px]"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              {aqiData && weatherData && (
                <>
                  <TemperatureCard weatherData={weatherData} />
                  <AirQualityCard weatherData={weatherData} aqiData={aqiData} />
                </>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              {ForcastData && (
                <>
                  <TodayChart data={ForcastData} />
                  <TomorrowCard data={ForcastData} />
                </>
              )}
            </div>
          </>
        )}
      </div>
      {loading ? (
        <>
          <div className="">
            <SkeletonCard className="w-[330px] md:w-[230px] h-[580px]" />
          </div>
        </>
      ) : error ? (
        <>
          <div className="">
            <SkeletonCard
              error={error}
              className="w-[330px] md:w-[230px] [580px]"
            />
          </div>
        </>
      ) : (
        <>
          <div className="">
            {weatherData && ForcastData && (
              <Aside weatherData={weatherData} forecastData={ForcastData} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
