"use client"
import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"

const ExpenseForm = () => {
    const router = useRouter()

    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("food")

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/expenses", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, amount, category })
            })

            setName("")
            setAmount("")
            setCategory("")
            router.refresh()


        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="">
            <form className="border shadow-lg shadow-gray-500/50 border-gray-200 rounded-lg p-8 flex flex-col space-y-3 justify-center max-w-200 mx-auto m-10" onSubmit={handleSubmit} action="">
                <h2 className="text-lg font-semibold">Expense Name</h2>
                <input className="border outline-none border-gray-200 px-4 py-2 rounded-lg" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Expense name" />
                <h2 className="text-lg font-semibold">Amount</h2>
                <input className="border outline-none border-gray-200 px-4 py-2 rounded-lg" value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Enter Amount" />
                <h2 className="text-lg font-semibold">Category</h2>
                <select value={category} onChange={(e)=>setCategory(e.target.value)} className="text-white bg-[#0a0a0a] p-2 border rounded-lg" name="category" id="category" required>
                    <option value="food">Food</option>
                    <option value="hardware">Hardware</option>
                    <option value="footwear">footwear</option>
                    <option value="clothes">Clothes</option>
                </select>

                <button className="border px-4 py-2 mt-4 font-bold bg-gray-300 text-black rounded-xl" type="submit">Add Expense</button>
            </form>

        </div>
    )
}

export default ExpenseForm