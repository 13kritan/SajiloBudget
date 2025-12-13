import { useState, useEffect, useMemo } from "react";
import axios from "axios";


const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}` // Bearer token for protected routes
  }
};

/**
 * Custom hook to fetch expenses from backend
 * Supports total, by type, and grouped
 */
export function useExpenses() {
    const [expenses, setExpenses] = useState(); // raw expense data
    const [total, setTotal] = useState(0);       // total amount
    const [grouped, setGrouped] = useState({});  // grouped by type
    const [expLoading, setExpLoading] = useState(true);
    const [expError, setError] = useState(null);

    const API_BASE = "http://localhost:5000/api/expenses";

    // Fetch all expenses
    const fetchExpenses = async () => {
        setExpLoading(true);
        setError(null);

        try {
            const res = await axios.get(`${API_BASE}/grouped`, config);
            setGrouped(res.data);

            const getExpense = await axios.get(`${API_BASE}`).then((res) => setExpenses(res), config);

            const allExpenses = Object.values(res.data).reduce((sum, val) => sum + val, 0);
            setTotal(allExpenses);

            // Optional: if you want raw expenses as well
            // const allRes = await axios.get(`${API_BASE}/total`);
            // setTotal(allRes.data.total);

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to fetch expenses");
        } finally {
            setExpLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    // Fetch by type
    const fetchByType = async (type) => {
        setExpLoading(true);
        setError(null);

        try {
            const res = await axios.get(`${API_BASE}/type/${type}`, config);
            return res.data.total;
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to fetch expenses by type");
            return 0;
        } finally {
            setExpLoading(false);
        }
    };

    const last10Days = useMemo(() => {
        if (!expenses?.data.length) return [];

        // Aggregate by date
        const grouped = expenses.data.reduce((acc, exp) => {
            const date = exp.date.slice(0, 10); // yyyy-mm-dd
            if (!acc[date]) acc[date] = 0;
            acc[date] += exp.amount;
            return acc;
        }, {});

        // Sort dates ascending
        const dates = Object.keys(grouped).sort();

        // Take last 10 days
        const lastDates = dates.slice(-10);

        // Map to amounts
        return lastDates.map(date => grouped[date]);
    }, [expenses]);

    return { expenses, last10Days, total, grouped, expLoading, expError, fetchExpenses, fetchByType };
}

export function useAddExpense(fetchExpenses) {
    const [amount, setAmount] = useState("");
    const [expenseType, setExpenseType] = useState("");
    const [type, setType] = useState("eSewa");
    const [note, setNote] = useState("");
    const [addLoading, setLoading] = useState(false);
    const [addError, setError] = useState(null);

    // Actual API call
    const addExpense = async () => {
        setLoading(true);
        setError(null);
        try {

            await axios.post("http://localhost:5000/api/expenses", {
                amount: Number(amount),
                type,
                expenseType,
                note,
                date: new Date(),
            }, config);

            // Refresh main expense totals if passed
            if (fetchExpenses) {
                await fetchExpenses();
            }

            // Clear fields after success
            setAmount("");
            setNote("");
        } catch (err) {
            console.error(err);
            setError("Failed to add expense");
        } finally {
            setLoading(false);
        }
    };

    // Form handler
    const handleAdd = async (e) => {
        e.preventDefault();
        await addExpense();
    };

    return {
        amount,
        type,
        expenseType,
        note,
        setAmount,
        setType,
        setExpenseType,
        setNote,
        addLoading,
        addError,
        handleAdd,
    };
}

export function useDailySpendingAverage(days = 10) {
    const [avg, setAvg] = useState(0);
    const [percentChange, setPercentChange] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAvg = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await axios.get(`http://localhost:5000/api/summary/daily-average?days=${days}`).then((res) => {
                setAvg(res.data.lastAvg);
                setPercentChange(res.data.percentChange);
            }, config)

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to fetch daily average");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAvg();
    }, []);

    return { avg, percentChange, loading, error, refetch: fetchAvg };
}