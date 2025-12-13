import { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/auth";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}` // Bearer token for protected routes
  }
};


export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async ({ name, email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API}/register`, { name, email, password }, config);
      localStorage.setItem("token", res.data.token);
      return res.data.user;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API}/login`, { email, password }, config);
      localStorage.setItem("token", res.data.token);
      return res.data.user;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  return { register, login, logout, loading, error };
}
