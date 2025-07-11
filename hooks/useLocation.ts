import { LocationData } from "@/types/location";
import useData from "./useData";

const useLocation = (selectedCity: string) =>
  useData<LocationData[]>(
    "/geo/1.0/direct",
    { params: { q: selectedCity, limit: 5 } },
    selectedCity
  );

export default useLocation;
