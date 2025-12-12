import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Esewa from "../assets/esa.png"
import ESewa from "../assets/esewa.png"
import { useEsewaIncome } from "../hooks/useNewIncome";

export default function NewIncome({ onClose }) {
    const navigate = useNavigate()
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
  
    const { addIncome, loading, error, success } = useEsewaIncome();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!addIncome) return console.error("addIncome is undefined!");
  
      await addIncome({ amount, note });
  
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
            <img className="h-8" src={Esewa} alt="esewa" />
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-1/3 bg-gray-800 px-5 py-5 rounded-lg items-center">
                <img className="h-16" src={ESewa} alt="esewa" />
                <input
                    type="number"
                    placeholder="Amount in NPR"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="p-2 rounded border w-full  outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    required
                />

                <input
                    type="text"
                    placeholder="Note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="p-2 rounded border w-full"
                />

                {error && <p className="text-red-500">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-orange-500 text-white px-4 py-2 rounded "
                >
                    {loading ? "Adding..." : "Add eSewa Income"}
                </button>
            </form>
        </div>
    );
}
