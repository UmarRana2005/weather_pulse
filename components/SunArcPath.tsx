import React from "react";

interface SunPathProps {
  sunrise: number; // Unix timestamp in seconds
  sunset: number;
  currentTime: number;
}

const SunPathArc: React.FC<SunPathProps> = ({
  sunrise,
  sunset,
  currentTime,
}) => {
  const width = 200;
  const height = 120;
  const radius = 80;
  const centerX = width / 2;
  const centerY = height;

  // Clamp time between sunrise and sunset
  const totalDaylight = sunset - sunrise;
  const clampedTime = Math.max(
    0,
    Math.min(currentTime - sunrise, totalDaylight)
  );
  const percent = clampedTime / totalDaylight;

  // Angle from 180° to 0° (left to right across top)
  const angle = Math.PI * percent; // radians
  const sunX = centerX - radius * Math.cos(angle);
  const sunY = centerY - radius * Math.sin(angle);

  // Main arc path (semi-circle)
  const arcPath = describeArc(centerX, centerY, radius, 180, 0);

  // Progress arc path
  const progressPath = describeArc(
    centerX,
    centerY,
    radius,
    180,
    180 - percent * 180
  );
  return (
    <svg width={width} height={height + 30}>
      {/* Background arc */}
      <path
        d={arcPath}
        fill="none"
        stroke="#e0e0e0"
        strokeWidth={4}
        strokeDasharray="4 3"
      />

      {/* Progress arc fill */}
      <path d={progressPath} fill="none" stroke="orange" strokeWidth={4} />

      {/* Sun icon */}
      <text
        x={sunX}
        y={sunY}
        fontSize="18"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        ☀️
      </text>
    </svg>
  );
};

export default SunPathArc;

/**
 * Helper to create SVG arc path
 */
function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}

/**
 * Convert polar coordinates to cartesian (for SVG arc)
 */
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy - r * Math.sin(angleRad),
  };
}
