import React from "react";

export default function BudgetCircle({ total, balance }) {
    const percent = balance ? (total / balance) * 100 : 0;

    // Color logic
    const strokeColor =
        percent < 40 ? "#10B981" :       // green
            percent < 75 ? "#EAB308" :       // yellow
                "#EF4444";        // red

    const width = 700;
    const height = 100;
    const radius = 20; // rounded corner
    const perimeter = 2 * (width + height - 2 * radius) + (Math.PI * 2 * radius);
    const offset = perimeter - (percent / 100) * perimeter;

    return (
        <div className="flex items-center justify-center relative">
            <svg width={width} height={height} className="rounded-2xl overflow-visible">

                {/* Background border */}
                <rect
                    x="10"
                    y="10"
                    width={width - 20}
                    height={height - 20}
                    rx={radius}
                    stroke="#1f2937"            // slate-700
                    strokeWidth="8"
                    fill="none"
                />

                {/* Progress border */}
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
                        filter: `drop-shadow(0 0 6px ${strokeColor}60)` // soft glow
                    }}
                />
            </svg>

            {/* Center content */}
            <div className="absolute text-center">
                <p className="text-3xl font-bold text-white">{percent.toFixed(1)}%</p>
                <p className="text-gray-300">Budget Used</p>
            </div>
        </div>
    );
}
