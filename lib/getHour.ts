export const getHour = (dateTime: string) => {
  // ex: dateTime = "2025-07-14 09:00:00"
  const hourTime = dateTime.slice(11, 13);
  return Number(hourTime);
};
