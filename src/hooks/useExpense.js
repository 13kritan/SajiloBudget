import { useState, useEffect } from "react";
import axios from "axios";

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
            const res = await axios.get(`${API_BASE}/grouped`);
            setGrouped(res.data);

            const getExpense = await axios.get(`${API_BASE}`).then((res) => setExpenses(res));

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
            const res = await axios.get(`${API_BASE}/type/${type}`);
            return res.data.total;
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to fetch expenses by type");
            return 0;
        } finally {
            setExpLoading(false);
        }
    };

    return { expenses, total, grouped, expLoading, expError, fetchExpenses, fetchByType };
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
            });

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
