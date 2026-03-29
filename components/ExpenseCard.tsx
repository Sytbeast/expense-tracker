"use client"
import React from 'react'
import { useRouter } from 'next/navigation';

interface props {
    name: string;
    amount: number;
    category: string;
    id: string;
}

export default function ExpenseCard({ name, amount, category, id }: props) {
    const router = useRouter()

    const handleDelete = async () => {
        try {
            const res = await fetch("/api/expenses", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            })
            router.refresh()

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="border border-gray-200 p-4 flex flex-col gap-2 rounded-xl shadow-xl shadow-red-300/50 mt-10">
            <p><span className='text-gray-400 font-semibold'>Expense Name:</span>{name}</p>
            <p><span className='text-gray-400 font-semibold'>Amount:</span>{amount}</p>
            <p><span className='text-gray-400 font-semibold'>Category:</span>{category}</p>
            <button onClick={handleDelete} className='border bg-red-600 text-white font-bold border-red-600 px-4 py-2 rounded hover:bg-red-700 '>Delete</button>
        </div>
    )
}


