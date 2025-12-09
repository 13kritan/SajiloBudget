import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ThemeToggle from './ThemeToggle'
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons'
// <FontAwesomeIcon icon={['fab', 'apple']} />

function NavBar() {
    return (
        <nav className="flex justify-between p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow">
            <h1 className="font-bold text-2xl">sajilo<span className='text-orange-500'>Budget</span></h1>
            <div className="p-2 px-4 flex items-center rounded-3xl bg-gray-700">
                <h3 className='text-gray-300 text-md'>Exchange Rates</h3>
            </div>
            <div className="right flex gap-2">
                <div className="p-2 rounded-full text-white text-xl"><FontAwesomeIcon icon={faUser} /></div>
                <div className="p-2 rounded-full text-white text-xl"><FontAwesomeIcon icon={faBell} /></div>
                <ThemeToggle />
            </div>

        </nav>
    )
}

export default NavBar
