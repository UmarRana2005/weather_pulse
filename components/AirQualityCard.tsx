"use client";
import React from "react";
import { Wind } from "lucide-react";
import useAirQuality from "@/hooks/useAirQuality";
import useWeather from "@/hooks/useWeather";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AirIllustration from "./AirIllustration";

interface Props {
  lat: number;
  lon: number;
  city: string;
}

const getAQILabel = (aqi: number) => {
  switch (aqi) {
    case 1:
      return "Good";
    case 2:
      return "Fair";
    case 3:
      return "Moderate";
    case 4:
      return "Poor";
    case 5:
      return "Very Poor";
    default:
      return "Unknown";
  }
};

const getAQIProgress = (aqi: number) => {
  switch (aqi) {
    case 1:
      return 20;
    case 2:
      return 40;
    case 3:
      return 60;
    case 4:
      return 80;
    case 5:
      return 100;
    default:
      return 0;
  }
};

const getAQIColor = (aqi: number) => {
  switch (aqi) {
    case 1:
      return "bg-green-500";
    case 2:
      return "bg-yellow-400";
    case 3:
      return "bg-orange-400";
    case 4:
      return "bg-red-500";
    case 5:
      return "bg-purple-700";
    default:
      return "bg-gray-400";
  }
};

const AirQualityCard = ({ lat, lon, city }: Props) => {
  const { data: aqiData } = useAirQuality(lat, lon, city);
  const { data: weatherData } = useWeather(city);

  const aqi = aqiData?.list[0].main.aqi ?? 0;
  const windSpeed = weatherData?.wind.speed ?? 0;
  const pm25 = aqiData?.list[0].components.pm2_5;

  return (
    <>
      {aqiData && weatherData && (
        <div className="w-[360px] flex flex-col md:flex-row justify-between items-center gap-6 p-6 rounded-2xl shadow-md bg-background text-foreground relative border border-border transition-all duration-300">
          <div className="flex-1 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="grid place-content-center p-2 bg-muted rounded-full">
                <Wind className="text-orange-300" />
              </div>
              <div>
                <p className="text-xl font-bold capitalize">Air Quality</p>
                <p className="text-sm font-medium capitalize text-muted-foreground">
                  PM2.5 -{" "}
                  <span className="text-xs">{pm25?.toFixed(1)} µg/m³</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-extrabold">{windSpeed} </h2>
              <span className="px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground">
                m/s
              </span>
            </div>

            {/* AQI with Tooltip and Progress */}
            <div className="h-[75px] p-3 bg-muted rounded-xl">
              <div className="w-full flex items-center justify-between">
                <span className="text-xs py-1 text-muted-foreground">Good</span>
                <span className="text-xs py-1 text-muted-foreground">
                  Very Poor
                </span>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Progress
                        value={getAQIProgress(aqi)}
                        className="h-2"
                        indicatorClassName={`${getAQIColor(aqi)} h-2`}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      AQI: <strong>{getAQILabel(aqi)}</strong> ({aqi})
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="absolute hidden md:block flex-shrink-0 top-0 right-0">
            <AirIllustration index={aqi} />
          </div>
        </div>
      )}
    </>
  );
};

export default AirQualityCard;
