import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export function useEsewaIncome() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate()

  const addIncome = async ({ amount, note, source }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Axios POST request to backend API
      await axios.post("https://sajilobudget-production.up.railway.app/api/income", {
        amount: Number(amount),
        source: source,
        note,
        date: new Date(),
      }, authConfig()).then(() => setSuccess(true));
      
      toast.success("Income added successfully")
      navigate('/')

      ;
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
      const res = await axios.get("https://sajilobudget-production.up.railway.app/api/income", authConfig());
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
