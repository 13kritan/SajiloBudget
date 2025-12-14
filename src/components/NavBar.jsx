import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ThemeToggle from './ThemeToggle'
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons'
import useExchangeRates from '../hooks/useExchangeRates'
import Logo from '../assets/llg.png'

function NavBar() {

    const { rates, loading, error, refetch } = useExchangeRates();
    const nprRate = rates?.NPR
    return (
        <nav className="flex justify-between p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow">
            {/* <h1 className="font-bold text-2xl">sajilo<span className='text-orange-500'>Budget</span></h1> */}
            <img src={Logo} alt="logo" className="h-14" />
            <button className="py-2 px-4 flex items-center rounded-3xl bg-gray-700" onClick={refetch}>
                {
                    !loading ?
                        <h3 className='text-gray-300 text-md'>1 <span className='font-semibold text-gray-200'>USD</span> -
                            <span className='font-semibold text-gray-200'> NPR</span> {!error ? nprRate : <p>Error</p>}</h3> : <p>Loading</p>
                }
            </button>
            <div className="right flex gap-2">
                <div className="p-2 rounded-full text-white text-xl"><FontAwesomeIcon icon={faUser} /></div>
                <div className="p-2 rounded-full text-white text-xl"><FontAwesomeIcon icon={faBell} /></div>
                <ThemeToggle />
            </div>

        </nav>
    )
}

export default NavBar
