import { useEffect, useState } from "react";
import axios from "axios";

export default function useExchangeRates() {
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRates = async () => {
        setLoading(true);
        try {
            const res = await axios.get("https://api.exchangerate-api.com/v4/latest/USD").then(res => {
                const data = res.data.rates;
                setRates(data);
                setError(null);
            });
        } catch (err) {
            setError("Unable to load exchange rates.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRates();
    }, []);

    return {
        rates,
        loading,
        error,
        refetch: fetchRates,
    };
}
