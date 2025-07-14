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

const Dashboard = () => {
  const [search, setSearch] = useState("Lahore");
  const { data, error, isLoading } = useLocation(search);

  const cityData = data?.[0]; // Check if first entry exists

  return (
    <div className="flex flex-col gap-3 items-start justify-start px-2 py-2 bg-pink-200">
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
            <TemperatureCard city={cityData.name} />
            <AirQualityCard
              lat={cityData.lat}
              lon={cityData.lon}
              city={cityData.name}
            />
          </>
        )}
      </div>
      <div className="flex gap-2">
        {isLoading ? (
          <>
            <SkeletonCard className="w-[450px] h-[255px]" />
          </>
        ) : error || !cityData ? (
          <>
            <SkeletonCard error={error} className="w-[450px] h-[255px]" />
          </>
        ) : (
          <>
            <TodayChart city={cityData.name} />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
