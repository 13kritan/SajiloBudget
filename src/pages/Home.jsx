import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import Dropdown from '../components/Dropdown'

export default function Home() {
    return (
        <div className='w-full h-full px-24 py-5 flex flex-col gap-3 items-center'>
            {/* Three Cards Home Structure */}
            <div className="3cards flex gap-6 w-full">
                <Card titleCenter="true"
                    cardClass='bg-gradient-to-br from-blue-400 to-blue-800 text-white'
                    className='text-center font-semibold text-lg'
                    title="TOTAL INCOME">
                    Rs. 24000
                </Card>
                <Card titleCenter="true"
                    cardClass='bg-gradient-to-br from-violet-400 to-violet-800 text-white'
                    className='text-center font-semibold text-lg'
                    title="TOTAL SPENDING">
                    Rs. 19000
                </Card>
                <Card titleCenter="true"
                    cardClass='bg-gradient-to-br from-slate-400 to-slate-800 text-white'
                    className='text-center font-semibold text-lg'
                    title="CURRENT BALANCE">
                    Rs. 5000
                </Card>
            </div>

            {/* Budget Used Structure */}
            <div className="px-5 py-4 border-2 border-slate-900 rounded-lg w-1/2">
                <h2 className="text-2xl font-semibold text-white text-center">60% OF BUDGET USED</h2>
            </div>

            {/* Statistics Layout */}
            <div className="flex items-center justify-center gap-4 w-full">
                <Card title="QUICK ADD EXPENSE" cardClass='w-1/4 bg-slate-800' className='flex flex-col gap-2'>
                    <input type="number" inputMode='numeric' placeholder='AMOUNT'
                        className='bg-transparent text-gray-400 rounded-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-2 border-slate-700 px-4 py-2' />

                    <Dropdown label='CATEGORY' options={[
                        { label: "Dashboard", href: "/dashboard" },
                        { label: "Settings", onClick: () => alert("Settings clicked") },
                        { label: "Logout", onClick: () => alert("Logged out") },
                    ]
                    } />
                    <input placeholder='OUTLINE'
                        className='bg-transparent text-gray-400 rounded-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-2 border-slate-700 px-4 py-2' />
                    <Button>ADD</Button>
                </Card>
                <Card title="CATEGORY SPENDING" cardClass='w-2/4 bg-slate-800'>
                    Category


                </Card>
                <Card title="QUICK ACTION" cardClass='w-1/4 bg-slate-800'>
                    <div className='flex flex-col gap-2'>
                        <Button>New Income</Button>
                        <Button>View Reports</Button>
                    </div>
                </Card>
            </div>

            {/* Monthly Trend */}
            <div className="3card w-full flex gap-3">
                <Card title="MONTHLY TREND" cardClass='w-2/4 bg-slate-800'>

                </Card>
                <Card title="SMS ACTIVITY" cardClass='w-1/4 bg-slate-800'>

                </Card>
                <Card title="RECENT EXPENSES" cardClass='w-1/4 bg-slate-800'>

                </Card>
            </div>
        </div>
    )
}
