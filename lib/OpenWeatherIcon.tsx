import Image from "next/image";

const OpenWeatherIcon = ({ src }: { src: string }) => {
  return (
    <Image
      src={`https://openweathermap.org/img/wn/${src}@2x.png`}
      alt="Weather Pulse"
      width={40}
      height={40}
      className="w-8 h-8"
    />
  );
};

export default OpenWeatherIcon;
