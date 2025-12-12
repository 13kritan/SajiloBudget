import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useExpenses } from "../hooks/useExpense";
import { useIncomes } from "../hooks/useNewIncome";

export default function ReportsPage() {
    const location = useLocation()
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    const viewState = location.state?.type
    const [activeTab, setActiveTab] = useState(viewState === "expense" ? "expenses" : "income");
    const { expenses } = useExpenses()
    const { incomes } = useIncomes()

    const tabs = [
        { key: "income", label: "Income" },
        { key: "expenses", label: "Expenses" },
    ];

    const currentList = activeTab === "income" ? incomes : expenses;

    function formatTime(isoTime) {
        const date = new Date(isoTime);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    function formatDate(isoString) {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white px-24 py-5">
            <h1 className="text-3xl font-bold mb-6">Statements</h1>

            {/* Tabs */}
            <div className="flex gap-4 mb-6">
                {tabs.map((t) => (
                    <button
                        key={t.key}
                        onClick={() => setActiveTab(t.key)}
                        className={`px-4 py-2 rounded-xl border 
            ${activeTab === t.key
                                ? "bg-slate-800 border-slate-600"
                                : "bg-slate-900 border-slate-800 text-slate-400"
                            }
            `}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Statement List */}

            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4">
                {(activeTab === "income" ? incomes : expenses)?.length === 0 ? (
                    <p className="text-slate-500 text-center py-10">
                        No {activeTab} records found.
                    </p>
                ) : (
                    <ul className="space-y-4">
                        {activeTab === "income" ? incomes.map((item) => (
                            <li
                                key={item._id}
                                className="flex justify-between items-center bg-slate-800 border border-slate-700 p-4 rounded-xl"
                            >
                                <div className="flex gap-4">
                                    <h2 className="text-lg w-14 font-semibold">{item.source}</h2>
                                    <div className="flex flex-col">
                                        <p
                                            className={`text-lg font-bold ${activeTab === "income"
                                                ? "text-green-400"
                                                : "text-red-400"
                                                }`}
                                        >
                                            Rs. {item.amount}
                                        </p>
                                        <span className="text-sm text-gray-400">{item.note}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-md font-medium">{formatTime(item.date)}</p>
                                    <p className="text-sm text-slate-400">{formatDate(item.date)}</p>
                                </div>

                            </li>
                        ))
                            :(
                            !expenses?.data ? (
                                <p className="text-slate-500 text-center py-10">
                                    No {activeTab} records found.
                                </p>
                            ):
                            expenses?.data.sort(
                                (a, b) => new Date(b.date) - new Date(a.date)).map((item) => (
                                    <li
                                        key={item._id}
                                        className="flex justify-between items-center bg-slate-800 border border-slate-700 p-4 rounded-xl"
                                    >
                                        <div className="flex gap-6">
                                            <h2 className="text-lg font-semibold w-14">{item.type}</h2>
                                            <div className="flex flex-col">
                                                <p
                                                    className={`text-lg font-bold w-20 ${activeTab === "income"
                                                        ? "text-green-400"
                                                        : "text-red-400"
                                                        }`}
                                                >
                                                    Rs. {item.amount}
                                                </p>
                                                <p className="text-gray-500 text-sm">{item.note}</p>
                                            </div>

                                            <span className="text-md text-gray-400">{item.expenseType}</span>
                                        </div>
                                        <div>
                                            <p className="text-md font-medium">{formatTime(item.date)}</p>
                                            <p className="text-sm text-slate-400">{formatDate(item.date)}</p>
                                        </div>

                                    </li>
                                )))}
                                
                    </ul>
                )}
            </div>



        </div>

    );
}