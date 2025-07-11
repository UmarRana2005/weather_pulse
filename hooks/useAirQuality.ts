import { AirQualityData } from "@/types/airQuality";
import useData from "./useData";

const useAirQuality = (late: number, long: number, selectedCity: string) =>
  useData<AirQualityData>(
    "/data/2.5/air_pollution",
    { params: { lat: late, lon: long } },
    selectedCity
  );

export default useAirQuality;
