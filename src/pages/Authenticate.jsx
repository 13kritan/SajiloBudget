import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from '../components/Login'
import Logo from '../assets/llg.png'
import Register from '../components/Register';

export default function Authenticate() {
    return (
        <div className='flex justify-center gap-5 bg-slate-600 min-h-screen w-full px-5 py-4'>
            <div className="flex flex-col items-center justify-center gap-5 flex-1 bg-slate-700 rounded-lg p-7">


                <img src={Logo} alt="" />

                {/* Tagline for Purpose */}
                <p className="text-md font-semibold text-gray-400 max-w-xs">
                    Budget Management App.
                </p>
                <p className="text-sm font-light text-gray-400 max-w-full">
                    Achieve financial freedom and monitor your wealth with simplicity.
                </p>

                {/* Optional: Add a simple decorative element for "Budget" context */}
                <div className="mt-8">
                    <p className="text-xs text-gray-500">Trusted by over 10,000 users.</p>
                </div>

            </div>
            <div className="flex flex-col items-center justify-around gap-5 flex-1 bg-slate-700 rounded-lg p-7">

                <Routes>
                    {/* Relative paths only */}
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    {/* Default redirect */}
                    <Route path="*" element={<Navigate to="login" />} />
                </Routes>
            </div>
        </div>
    )
}

