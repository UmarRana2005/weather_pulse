export const unixToGMT = (timeStamp: number) => {
  const date = new Date(timeStamp * 1000); // Convert seconds to milliseconds

  return date.toLocaleString("en-US", {
    timeZone: "UTC", // Use UTC for GMT time
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};
