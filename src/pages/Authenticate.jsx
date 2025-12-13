import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from '../components/Login'
import Logo from '../assets/llg.png'
import Register from '../components/Register';

export default function Authenticate() {
    return (
        <div className='flex justify-center gap-5 bg-slate-600 min-h-screen w-full px-5 py-4'>
            <div className="flex flex-col items-center justify-around gap-5 flex-1 bg-slate-700 rounded-lg p-7">
                <img src={Logo} alt="logo" className="h-48" />
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

