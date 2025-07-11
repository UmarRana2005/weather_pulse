"use client";
import React, { useState } from "react";
import Image from "next/image";
import Avatar from "../public/avatar.jpg";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import AirQualityCard from "./AirQualityCard";
import useLocation from "@/hooks/useLocation";
import TemperatureCard, { TemperatureSkeleton } from "./TemperatureCard";
const Dashboard = () => {
  const [search, setSearch] = useState("Lahore");
  const { data, error, isLoading } = useLocation(search);
  return (
    <div className="flex flex-col gap-9 items-start justify-start px-2 py-2 bg-piank-200">
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
      <div className="flex gap-2">
        {data ? (
          <TemperatureCard city={data[0].name} />
        ) : (
          <TemperatureSkeleton />
        )}
        {data ? (
          <AirQualityCard
            lat={data[0].lat}
            lon={data[0].lon}
            city={data[0].name}
          />
        ) : (
          <TemperatureSkeleton />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
