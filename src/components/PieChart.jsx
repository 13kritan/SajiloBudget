import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const authConfig = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });


export default function ExpensePieChart({ darkMode = false }) {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await axios.get("https://sajilobudget.onrender.com/api/expenses/summary", authConfig());
                console.log(res)
                const sorted = res.data.sort((a, b) => b.total - a.total);
                const categories = sorted.map((item) => item._id);
                const amounts = sorted.map((item) => item.total);

                // Choose color palette depending on darkMode
                const colors = darkMode
                    ? [
                        "#f87171", "#fb923c", "#facc15", "#34d399",
                        "#60a5fa", "#a78bfa", "#f472b6", "#f97316",
                        "#3b82f6", "#10b981", "#8b5cf6"
                    ]
                    : [
                        "#f87171", "#fb923c", "#facc15", "#34d399",
                        "#60a5fa", "#a78bfa", "#f472b6", "#f97316",
                        "#3b82f6", "#10b981", "#8b5cf6"
                    ];

                setChartData({
                    labels: categories,
                    datasets: [
                        {
                            data: amounts,
                            backgroundColor: colors,
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (err) {
                console.error("Failed to fetch expense summary:", err);
            }
        };

        fetchSummary();
    }, []);

    if (!chartData) return <p>Loading chart...</p>;

    return (
        <div className={`w-full max-w-md mx-auto p-4 rounded-lg shadow-md bg-gray-900}`}>
            <h2 className={`text-lg font-semibold mb-4 text-center ${darkMode ? "text-gray-200" : "text-gray-400"}`}>
                Expense Distribution
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">


                {/* Pie Chart */}
                <div className="lg:w-56 md:w-56">
                    <Pie
                        width={4}
                        data={chartData}
                        options={{
                            plugins: {
                                legend: { display: false },

                                datalabels: {
                                    
                                    color: darkMode ? "#fff" : "#000",
                                    font: { weight: "bold", size: 12 },
                                    anchor: "bottom",     // outside the circle
                                    align: "end",      // outside the arc
                                    offset: 12,        // controls how far outside
                                    formatter: (value, ctx) => {
                                        const dataArr = ctx.chart.data.datasets[0].data;
                                        const sum = dataArr.reduce((a, b) => a + b, 0);
                                        if ((value / sum) * 100 < 7) return null;
                                        return ((value / sum) * 100).toFixed(1) + "%";
                                    },
                                },
                            },

                            maintainAspectRatio: true,
                            aspectRatio: 1,
                        }}
                    />

                </div>

                {/* Custom Legend With Percent */}
                <div className="flex flex-col justify-center gap-1">
                    {chartData.labels.map((label, index) => {

                        return (
                            <div key={index} className="flex items-center gap-1">

                                {/* Color box */}
                                <span
                                    className="w-3 h-3 rounded-sm"
                                    style={{
                                        backgroundColor:
                                            chartData.datasets[0].backgroundColor[index],
                                    }}
                                ></span>

                                {/* Label  */}
                                <span className={`${darkMode ? "text-gray-200" : "text-gray-400"}`}>
                                    {label}
                                </span>
                            </div>
                        );
                    })}
                </div>

            </div>



        </div>
    );
}
