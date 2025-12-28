import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from '../components/Login'
import Logo from '../assets/llg.png'
import Register from '../components/Register';

export default function Authenticate() {
    return (
        <div className='flex md:flex-row xs:flex-col justify-center gap-5 bg-slate-600 min-h-screen w-full px-5 py-4'>
            <div className="flex flex-col items-center justify-center md:gap-5 xs:gap-2 md:flex-1 bg-slate-700 rounded-lg md:p-7 xs:p-2">

                <img className='xs:h-20 md:h-auto' src={Logo} alt="" />
                
                <p className="text-md font-semibold text-gray-400 max-w-xs">
                    Budget Management App.
                </p>
                <p className="text-sm font-light text-gray-400 max-w-full text-center">
                    Achieve financial freedom and monitor your wealth with simplicity.
                </p>

                <div className="md:mt-8 xs:mt-2">
                    <p className="text-xs text-gray-500">Trusted by over 10,000 users.</p>
                </div>

            </div>
            <div className="flex flex-col items-center justify-around gap-5 flex-1 bg-slate-700 rounded-lg md:p-7 xs:p-2">

                <Routes>
            
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    
                    <Route path="*" element={<Navigate to="login" />} />
                </Routes>
            </div>
        </div>
    )
}

