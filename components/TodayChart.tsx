"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { fillChartData } from "@/lib/fillChartData";
import { ChartData } from "@/types/chartData";
import OpenWeatherIcon from "@/lib/OpenWeatherIcon";
import { TodayForecastData } from "@/types/todayForecast";

const TodayChart = ({ data }: { data: TodayForecastData }) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (data?.list?.length) {
      const todayForecast = {
        ...data,
        list: data.list.slice(0, 8),
      };
      setChartData(fillChartData(todayForecast));
    }
  }, [data]);

  return (
    <>
      {chartData.length > 0 && (
        <div className="w-[450px] p-4 rounded-2xl shadow-md bg-background text-foreground relative border border-border transition-all duration-300">
          <h2 className="text-lg font-semibold text-foreground mb-3">
            How&apos;s the temperature today?
          </h2>

          <ResponsiveContainer width="100%" height={130}>
            <LineChart data={chartData}>
              <XAxis
                dataKey="label"
                padding={{ left: 20, right: 20 }}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                hide
              />
              <YAxis domain={["dataMin - 5", "dataMax + 5"]} hide />
              <Tooltip
                cursor={false}
                contentStyle={{
                  backgroundColor: "hsl(var(--muted))",
                  borderRadius: "8px",
                  padding: "10px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                }}
                formatter={(value) => [`${value}°C`, "Temp"]}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#fb923c"
                strokeWidth={2}
                activeDot={{ r: 4 }}
                dot={({ cx, cy, payload }) =>
                  cx && cy && payload ? (
                    <g>
                      <foreignObject
                        x={cx - 15}
                        y={cy - 50}
                        width={30}
                        height={30}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <OpenWeatherIcon src={payload.icon} />
                        </div>
                      </foreignObject>
                      <circle
                        cx={cx}
                        cy={cy}
                        r={3}
                        fill="#fb923c"
                        stroke="#fff"
                        strokeWidth={1}
                      />
                    </g>
                  ) : null
                }
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="flex justify-between mt-3">
            {chartData.map((point, i) => (
              <div key={i} className="flex flex-col items-center text-sm">
                <p className="font-semibold">{Math.round(point.temp)}°</p>
                <span className="text-muted-foreground text-xs">
                  {point.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TodayChart;
