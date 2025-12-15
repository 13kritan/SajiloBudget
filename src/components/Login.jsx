import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const { login, logout, loading, error } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const log = await login({ email, password })
        if (log) navigate('/')
    };
    return (
        <div className="flex items-center justify-center rounded-lg md:w-2/3 xs:w-full">
            <div className="bg-gray-800 text-white rounded-2xl shadow-lg w-full max-w-md md:p-8 xs:p-3">
                <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 text-gray-300">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div className="flex flex-col relative">
                        <label htmlFor="password" className="mb-1 text-gray-300">Password</label>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/3 translate-y-1/2 text-gray-400 hover:text-gray-200"
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-indigo-600 hover:bg-indigo-700 transition-colors py-2 rounded-lg font-semibold"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-6 text-gray-400 text-center text-sm">
                    Don’t have an account?{" "}
                    <Link to="/authenticate/register" className="text-indigo-500 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    )
}
