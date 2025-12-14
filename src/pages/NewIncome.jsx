import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Esewa from "../assets/esa.png"
import Cash from "../assets/cash.png"
import Bank from "../assets/bank.png"
import { useEsewaIncome } from "../hooks/useNewIncome";

export default function NewIncome({ onClose }) {
    const navigate = useNavigate()
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [activeMode, setActiveMode] = useState("eSewa")
    const [source, setSource] = useState("eSewa")

    const { addIncome, loading, error, success } = useEsewaIncome();

    const handleClick = (e) => {
        setActiveMode(e.currentTarget.value)
        setSource(e.currentTarget.value)
        console.log(activeMode, source)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!addIncome) return console.error("addIncome is undefined!");

        await addIncome({ amount, note, source });

        if (success) {
            alert("eSewa income added successfully!");
            onClose();
            setAmount("");
            setNote("");
            navigate('/')
        }
    };


    return (
        <div className='w-full h-full px-24 py-5 flex flex-col gap-3 items-center justify-center'>
            <div className="bg-slate-800 text-white rounded-2xl shadow-lg w-full max-w-md p-8">
                <h2 className="text-3xl font-bold text-center text-gray-400 mb-5">Add a Income</h2>
                <div className=" flex items-center justify-around w-full mb-3">
                    <button className={`rounded-lg p-3 bg-slate-700 hover:bg-slate-600 transition ${activeMode === "eSewa" ? 'border border-green-500' : ''}`} value="eSewa" onClick={handleClick}>
                        <img className="h-10" src={Esewa} alt="esewa" />
                    </button>
                    <button className={`rounded-lg p-3 bg-slate-700 hover:bg-slate-600 transition ${activeMode === "Bank" ? 'border border-green-500' : ''}`} value="Bank" onClick={handleClick}>
                        <img className="h-10" src={Bank} alt="bank" />
                    </button>
                    <button className={`rounded-lg p-3 bg-slate-700 hover:bg-slate-600 transition ${activeMode === "Cash" ? 'border border-green-500' : ''}`} value="Cash" onClick={handleClick}>
                        <img className="h-10" src={Cash} alt="cash" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full bg-gray-800 px-5 py-5 rounded-lg items-center">
                    <input
                        type="number"
                        placeholder="Amount in NPR"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="px-4 py-2 bg-gray-700 rounded-lg w-full  outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none 
                    focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="px-4 py-2 rounded-lg w-full bg-gray-700 text-white placeholder-gray-400 outline-none"
                    />

                    {error && <p className="text-red-500">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-orange-500 text-white px-4 py-2 rounded "
                    >
                        {loading ? "Adding..." : `Add ${source} Income`}
                    </button>
                </form>
            </div>
        </div>
    );
}
