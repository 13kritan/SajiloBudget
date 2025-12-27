import React from "react";

export default function BudgetCircle({ total, balance }) {
  const percent = balance ? (total / balance) * 100 : 0;

  const strokeColor =
    percent < 40 ? "#10B981" :
    percent < 75 ? "#EAB308" :
    "#EF4444";

  const width = 600;
  const height = 100;
  const radius = 20;

  const perimeter =
    2 * (width + height - 2 * radius) + (Math.PI * 2 * radius);

  const offset = perimeter - (percent / 100) * perimeter;

  return (
    <div className="flex items-center justify-center relative w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-[600px] sm:max-w-full h-auto rounded-2xl overflow-hidden"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect
          x="10"
          y="10"
          width={width - 20}
          height={height - 20}
          rx={radius}
          stroke="#1f2937"
          strokeWidth="8"
          fill="none"
        />

        {/* Progress */}
        <rect
          x="10"
          y="10"
          width={width - 20}
          height={height - 20}
          rx={radius}
          stroke={strokeColor}
          strokeWidth="8"
          fill="none"
          strokeDasharray={perimeter}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out drop-shadow-lg"
          style={{
            filter: `drop-shadow(0 0 6px ${strokeColor}60)`
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute text-center">
        <p className="text-4xl md:text-2xl sm:text-xl font-bold text-white">
          {percent.toFixed(1)}%
        </p>
        <p className="text-gray-300 text-lg sm:text-xs">
          Budget Used
        </p>
      </div>
    </div>
  );
}
