import React from "react";
import Image from "next/image";
import { weatherImages } from "@/constants/weatherImages";
import { weatherConditions } from "@/types/weatherConditions";
interface Props {
  condition: string;
  alt?: string;
  width?: number;
  height?: number;
  extraClasses?: string;
}
const WeatherIllustration = ({
  condition,
  alt,
  width = 150,
  height = 150,
  extraClasses,
}: Props) => {
  const fallbackImage = "/weather-conditions/sunny.png";
  const imageSrc =
    weatherImages[condition as weatherConditions] || fallbackImage;
  return (
    <>
      <Image
        src={imageSrc}
        alt={alt || "Rainy Weather Illustration"}
        width={width}
        height={height}
        className={`object-contain opacity-90 dark:opacity-80 ${extraClasses}`}
      />
    </>
  );
};

export default WeatherIllustration;
