export const unixToOffsetTime = (unix: number, offsetSeconds: number) => {
  const localMillis = (unix + offsetSeconds) * 1000;
  const localDate = new Date(localMillis);

  return localDate.toLocaleString("en-US", {
    timeZone: "UTC", // Show the already adjusted date in UTC
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
