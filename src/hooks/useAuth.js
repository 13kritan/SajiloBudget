import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API = "https://sajilobudget-production.up.railway.app/api/auth";

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
      localStorage.setItem("user", res.data.user);
      toast.success("Account created successfully")
      return res.data.user;
    } catch (err) {
      toast.error(err.response?.data?.message)
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
      localStorage.setItem("user", res.data.user);
      toast.success("Logged In")
      return res.data.user;
    } catch (err) {
      toast.error("Invalid Login Credentials!")
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return { register, login, logout, loading, error };
}
