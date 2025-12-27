import { useEffect, useState } from "react";
import axios from "axios";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const authConfig = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export default function TrendChart({ darkMode }) {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchTrend = async () => {
            try {
                const res = await axios.get("https://sajilobudget.onrender.com/api/summary", authConfig());
                const days = Object.keys(res.data);
                const income = days.map(d => res.data[d].income);
                const expense = days.map(d => res.data[d].expense);

                setChartData({
                    labels: days.map(d => d.slice(5)), // MM-DD
                    datasets: [
                        {
                            label: "Income",
                            data: income,
                            borderColor: "#22c55e",
                            backgroundColor: "#22c55e55",
                            tension: 0.4,
                        },
                        {
                            label: "Expense",
                            data: expense,
                            borderColor: "#ef4444",
                            backgroundColor: "#ef444455",
                            tension: 0.4,
                        }
                    ]
                });
            } catch (err) {
                console.error(err);
            }
        };

        fetchTrend();
    }, []);

    if (!chartData) return <p className="text-gray-400">Loading trend...</p>;

    return (
        <div className="w-full max-w-2xl mx-auto p-4 bg-slate-900 rounded-2xl border border-slate-700 shadow ">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-300">
                Last 10 Days
            </h2>

            <Line
            
                data={chartData}
                height={200}
                options={{
                    responsive: true,
                    maintainAspectRatio: true,

                    scales: {
                        y: {
                            ticks: { color: darkMode ? "#e5e7eb" : "#4b5563" },
                            grid: {
                                color: darkMode
                                    ? "rgba(255,255,255,0.08)" 
                                    : "rgba(0,0,0,0.1)",
                                lineWidth: 1.2,
                            }
                        },
                        x: {
                            ticks: { color: darkMode ? "#e5e7eb" : "#4b5563" },
                            grid: { display: false }
                        }
                    },

                    plugins: {
                        legend: {
                            labels: {
                                color: darkMode ? "#f3f4f6" : "#9ca3af",
                                usePointStyle: true,
                                pointStyle: "circle",
                                font: { size: 13 },
                            }
                        },

                        datalabels: {
                            display: "false",
                            anchor: "end",
                            align: "top",
                            offset: 1,
                            color: darkMode ? "#e5e7eb" : "#9ca3af",
                            font: {
                                size: 5,
                                weight: "medium",
                            },
                            formatter: (value) => `${value === 0 ? "" : value}`,
                        },

                        tooltip: { enabled: true },
                        
                    }
                }}
            />

        </div>
    );
}
