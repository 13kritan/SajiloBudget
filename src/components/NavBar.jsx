import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import useExchangeRates from '../hooks/useExchangeRates'
import Logo from '../assets/llg.png'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import axios from 'axios'
import Button from './Button'

const authConfig = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

function NavBar() {
    const { rates, loading, error, refetch } = useExchangeRates();
    const nprRate = rates?.NPR
    const navigate = useNavigate()
    const { logout } = useAuth()
    const [user, setUser] = useState()

    const fetchUser = async () => {
        try {
            const res = await axios.get("https://sajilobudget-production.up.railway.app/api/auth/getUser", authConfig()).then((res)=> setUser(res.data?.user))
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        fetchUser()
    },[])
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <nav className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow">
            {/* <h1 className="font-bold text-2xl">sajilo<span className='text-orange-500'>Budget</span></h1> */}
            <img src={Logo} alt="logo" className="h-12 hover:cursor-pointer" onClick={() => navigate('/')} />
            <button className="md:py-2 md:px-4 xs:p-0 flex items-center rounded-3xl bg-gray-700" onClick={refetch}>
                {
                    !loading ?
                        <h3 className='text-gray-300 md:text-md xs:text-xs '>1 <span className='font-semibold text-gray-200'>USD</span> -
                            <span className='font-semibold text-gray-200'> NPR</span> {!error ? nprRate : <p>Error</p>}</h3> : <p>Loading</p>
                }
            </button>
            <div className="right flex gap-2 items-center relative">
                <div className="p-2 flex items-center justify-center bg-gray-700 hover:bg-gray-600 hover:cursor-pointer rounded-full text-white text-xl" onClick={() => setOpen(!open)}><FontAwesomeIcon icon={faUser} /></div>
                {open && (
                    <div
                        ref={dropdownRef}
                        className="absolute top-7 right-3 mt-2 w-48 flex flex-col items-center justify-center bg-slate-900 text-white rounded-lg shadow-lg p-4 z-50 space-y-2"
                    >
                        <p className="font-bold mb-2 flex items-center justify-center gap-3 w-full"><FontAwesomeIcon icon={faUserAlt} /> <span>{user?.name}</span></p>
                        <p className="text-sm mb-2">{user?.email}</p>
                        <Button variant='outline' onClick={()=>{
                            logout()
                            navigate("/authenticate")
                        }}>Log out</Button>
                    </div>
                )}
            </div>

        </nav>
    )
}

export default NavBar
