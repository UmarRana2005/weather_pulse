import React from "react";
import Image from "next/image";
interface Props {
  index: number;
  alt?: string;
  width?: number;
  height?: number;
  extraClasses?: string;
}

const AirIllustration = ({
  index,
  alt,
  width = 150,
  height = 150,
  extraClasses,
}: Props) => {
  const images = [
    "/air-conditions/air1.png",
    "/air-conditions/air2.png",
    "/air-conditions/air3.png",
    "/air-conditions/air4.png",
  ];
  const imageSrc =
    images.length > index ? images[index] : "/air-conditions/air3.png";
  return (
    <Image
      src={imageSrc}
      alt={alt || "Rainy Weather Illustration"}
      width={width}
      height={height}
      className={`object-contain opacity-90 dark:opacity-80 ${extraClasses}`}
    />
  );
};

export default AirIllustration;
