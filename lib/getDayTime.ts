import { DayTime } from "@/types/chartData";

export const getDayTime = (hour: number) => {
  if (hour >= 0 && hour < 6) {
    return DayTime.night;
  } else if (hour >= 6 && hour < 12) {
    return DayTime.morning;
  } else if (hour >= 12 && hour < 18) {
    return DayTime.afternoon;
  } else {
    return DayTime.evening;
  }
};
