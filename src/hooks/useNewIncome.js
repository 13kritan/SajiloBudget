import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Custom hook to add eSewa income
 * Returns: addIncome function + loading, error, success states
 */
export function useEsewaIncome() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addIncome = async ({ amount, note }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Axios POST request to backend API
      await axios.post("http://localhost:5000/api/income", {
        amount: Number(amount),
        source: "eSewa",
        note,
        date: new Date(),
      });

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add income");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { addIncome, loading, error, success };
}

export function useIncomes() {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIncomes = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get("http://localhost:5000/api/income");
      setIncomes(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch incomes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  return { incomes, loading, error, refetch: fetchIncomes };
}
