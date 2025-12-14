import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import Dropdown from '../components/Dropdown'
import { useNavigate } from "react-router-dom";
import { useIncomes } from "../hooks/useNewIncome";
import { useAddExpense, useDailySpendingAverage, useExpenses } from '../hooks/useExpense'
import BudgetCircle from '../components/BudgetCircle'
import ExpensePieChart from '../components/PieChart'
import TrendChart from '../components/MonthlyTrend'

export default function Home() {
    const navigate = useNavigate()
    const { incomes, loading, error, refetch } = useIncomes();
    const balance = incomes?.reduce((sum, income) => sum + income.amount, 0);

    const { expenses, total, grouped, last10Days, expLoading, expError, fetchExpenses, fetchByType } = useExpenses()
    const { avg, percentChange, refetch: fetchAvg } = useDailySpendingAverage()

    const { amount, type, expenseType, note, setAmount, setType, setExpenseType, setNote, addExpense, handleAdd } = useAddExpense(fetchExpenses);

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
        <div className='w-full h-full px-24 py-5 flex flex-col gap-5 items-center'>
            {/* Three Cards Home Structure */}
            <div className="3cards flex gap-6 w-full mb-2">
                <Card titleCenter="true"
                    cardClass='bg-gradient-to-br from-blue-400 to-blue-800 text-white'
                    className='text-center font-semibold text-lg'
                    title="TOTAL INCOME">
                    Rs. {balance ? balance : <p>Failed</p>}
                </Card>
                <Card titleCenter="true"
                    cardClass='bg-gradient-to-br from-violet-400 to-violet-800 text-white'
                    className='text-center font-semibold text-lg'
                    title="TOTAL SPENDING">
                    Rs. {total ? total : <p>Failed</p>}
                </Card>
                <Card titleCenter="true"
                    cardClass='bg-gradient-to-br from-slate-400 to-slate-800 text-white'
                    className={`text-center font-semibold text-lg ${total>balance? 'text-red-400' : ''}`}
                    title="CURRENT BALANCE">
                    Rs. {balance - total}

                </Card>
            </div>

            {/* Budget Used Structure */}
            <BudgetCircle total={total} balance={balance} />


            {/* Statistics Layout */}
            <div className="flex justify-center gap-4 w-full">
                {/* QUICK ADD EXPENSE */}
                <Card title="QUICK ADD EXPENSE" cardClass="w-1/4 bg-slate-800" className="flex flex-col gap-4">
                    <input
                        type="number"
                        inputMode="numeric"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="AMOUNT"
                        className="bg-transparent text-gray-400 rounded-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-2 border-slate-700 px-4 py-2"
                    />

                    {/* CATEGORY DROPDOWN */}
                    <Dropdown
                        label={type}   // << dynamically updates
                        options={[
                            { label: "Cash", onClick: () => setType("Cash") },
                            { label: "Esewa", onClick: () => setType("eSewa") },
                            { label: "Bank", onClick: () => setType("Bank") },
                        ]}
                        selected={type}              // controlled value
                        onSelect={(opt) => setType(opt.label)} // parent setter
                    />
                    <Dropdown
                        label={expenseType || "Tag"}
                        options={[
                            { label: "Food & Drinks", onClick: () => setExpenseType("Food & Drinks") },
                            { label: "Transport", onClick: () => setExpenseType("Transport") },
                            { label: "Shopping", onClick: () => setExpenseType("Shopping") },
                            { label: "Bills & Utilities", onClick: () => setExpenseType("Bills & Utilities") },
                            { label: "Entertainment", onClick: () => setExpenseType("Entertainment") },
                            { label: "Health", onClick: () => setExpenseType("Health") },
                            { label: "Education", onClick: () => setExpenseType("Education") },
                            { label: "Travel", onClick: () => setExpenseType("Travel") },
                            { label: "Savings", onClick: () => setExpenseType("Savings") },
                            { label: "Donations", onClick: () => setExpenseType("Donations") },
                            { label: "Others", onClick: () => setExpenseType("Others") }
                        ]}
                        selected={expenseType}              // controlled value
                        onSelect={(opt) => setExpenseType(opt.label)} // parent setter
                    />

                    {/* OUTLINE */}
                    <input
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="OUTLINE"
                        className="bg-transparent text-gray-400 rounded-lg outline-none [appearance:textfield] border-2 border-slate-700 px-4 py-2"
                    />

                    {/* ADD BUTTON */}
                    <Button onClick={handleAdd}>ADD</Button>
                </Card>

                {/* PIE CHART */}
                <Card title="CATEGORY SPENDING" cardClass='w-2/4 bg-slate-800'>
                    <ExpensePieChart />
                </Card>

                {/* QUICK ACTION BUTTONS */}
                <Card title="QUICK ACTION" cardClass='w-1/4 bg-slate-800'>
                    <div className='flex flex-col gap-2'>
                        <Button
                            onClick={() => navigate("/newIncome")}>
                            New Income
                        </Button>
                        <Button onClick={() => navigate("/report")}>View Reports</Button>
                    </div>
                </Card>
            </div>

            {/* Monthly Trend */}
            <div className="3card w-full flex gap-3">
                {/* TREND CHART */}
                <Card title="BUDGET TREND" cardClass='w-2/4 bg-slate-800 py-5'>
                    <TrendChart />
                </Card>

                {/* SOMETHING */}
                <Card title="EXPENSE ANALYSIS" cardClass='w-1/4 bg-slate-800' className='space-y-3'>
                    <div className="p-4 border border-slate-700 rounded-lg bg-slate-800 text-white w-full flex flex-col gap-1">
                        <h2 className="text-md text-gray-400 font-semibold">Daily Spending Avg</h2>
                        <p className="text-2xl font-bold text-gray-300">Rs. {avg}</p>
                        <p className={`mt-1 ${percentChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {percentChange >= 0 ? "▲" : "▼"} {Math.abs(percentChange)}% vs previous 10 days
                        </p>
                        <div className="flex items-end gap-1 h-16 mt-2 w-full">
                            {last10Days?.map((amt, i) => {
                                const maxAmount = Math.max(...last10Days); // scale bars
                                const heightPercent = maxAmount ? (amt / maxAmount) * 100 : 0;

                                // Color based on value (optional: red if above avg, green if below)
                                const avg = last10Days?.reduce((sum, val) => sum + val, 0) / last10Days?.length;
                                const barColor = amt > avg ? "bg-red-500" : "bg-green-500";

                                return (
                                    <div
                                        key={i}
                                        style={{ height: `${heightPercent}%` }}
                                        className={`w-[10%] rounded-sm transition-all duration-300 ${barColor}`}
                                        title={`NPR ${amt}`}
                                    ></div>
                                );
                            })}
                        </div>
                        <span className='font-medium text-xs text-gray-500 w-full text-center'>Spending last 10 Days</span>
                    </div>


                    <div className="p-4 border border-slate-700 rounded-lg bg-slate-800 text-white w-full">
                        <h2 className="text-md text-gray-400 font-semibold mb-2">Expense Source</h2>
                        <p className="text-lg  text-gray-300">Bank : <span className='text-gray-200 text-xl font-semibold'> Rs. {grouped?.Bank}</span></p>
                        <p className="text-lg  text-gray-300">Cash : <span className='text-gray-200 text-xl font-semibold'> Rs. {grouped?.Cash}</span></p>
                        <p className="text-lg  text-gray-300">Esewa : <span className='text-gray-200 text-xl font-semibold'> Rs. {grouped?.eSewa}</span></p>
                    </div>
                </Card>

                {/* RECENT EXPENSES */}
                <Card title="RECENT EXPENSES" cardClass='w-1/4 bg-slate-800 px-3 py-2' className='space-y-1'>
                    {
                        expenses?.data
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .slice(0, 4).map((item, i) => (
                                <li
                                    key={i}
                                    className="flex justify-between items-center bg-slate-800 border border-slate-700 p-4 rounded-xl"
                                >
                                    <div className="flex gap-6">
                                        <h2 className="text-lg font-semibold w-14">{item.type}</h2>
                                        <div className="flex flex-col">
                                            <p
                                                className="text-lg font-bold w-20 text-red-400"
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

                            ))
                    }
                    <button className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl"
                        onClick={() => navigate("/report", { state: { type: "expense" } })}>
                        View Full Data
                    </button>
                </Card>
            </div>
        </div >
    )
}
