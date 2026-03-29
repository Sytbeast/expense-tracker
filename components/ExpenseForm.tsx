"use client"
import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"

const ExpenseForm = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("food")

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!name) {
            setError("Name is required")
            return
        }
        if (!amount) {
            setError("amount is required")
            return
        }
        setLoading(true)

        try {
            const res = await fetch("/api/expenses", {
                cache: 'no-store',
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
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="">
            <form className="border relative shadow-lg shadow-gray-500/50 border-gray-200 rounded-lg p-8 flex flex-col space-y-3 justify-center max-w-200 mx-auto m-10" onSubmit={handleSubmit} action="">
                <h2 className="text-lg font-semibold">Expense Name</h2>
                <input className="border outline-none border-gray-200 px-4 py-2 rounded-lg" value={name} onChange={(e) => {setName(e.target.value); setError("")}} type="text" placeholder="Enter Expense name" />
                <h2 className="text-lg font-semibold">Amount</h2>
                <input className="border outline-none border-gray-200 px-4 py-2 rounded-lg" value={amount} onChange={(e) =>{ setAmount(e.target.value); setError("")}} type="number" placeholder="Enter Amount" />
                <h2 className="text-lg font-semibold">Category</h2>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="text-white bg-[#0a0a0a] p-2 border rounded-lg" name="category" id="category" required>
                    <option value="food">Food</option>
                    <option value="hardware">Hardware</option>
                    <option value="footwear">footwear</option>
                    <option value="clothes">Clothes</option>
                </select>

                <button disabled={loading} className="border px-4 py-2 mt-4 font-bold bg-gray-300 text-black shadow-lg shadow-gray-500/50 hover:bg-gray-400 rounded-xl" type="submit">{loading ? "Adding..." : "Add Expense"}</button>

                {error && <div className={` bg-red-200 z-10 transition-all duration-100 absolute top-1 font-semibold right-2 px-4 py-2 rounded-lg `}>
                    <div className="text-red-500">{error}</div>
                </div>}
            </form>



        </div>
    )
}

export default ExpenseForm