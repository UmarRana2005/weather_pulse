"use client";
import TemperatureCard from "@/components/TemperatureCard";
import useWeather from "@/hooks/useWeather";
import React from "react";

const Data = () => {
  const { data, isLoading, error } = useWeather("Lahore");

  return (
    <div className="">
      {isLoading && <p>Loading...</p>}
      {error && <p>Their is no city such that</p>}
      {data && <TemperatureCard data={data} />}
    </div>
  );
};

export default Data;
