export const dynamic = 'force-dynamic'

import ExpenseCard from "@/components/ExpenseCard";
import ExpenseForm from "@/components/ExpenseForm";
import connectDb from "@/lib/db";
import Expense from "@/models/Expense";

export default async function Home() {
  await connectDb()
  const expenses = await Expense.find().lean()

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="md:p-10 p-6 ">
      <ExpenseForm />

      <div className="w-full grid md:grid-cols-3 sm:grid-cols-2 gap-4">

        {expenses.map((expense) => (
          <ExpenseCard
            key={expense._id.toString()}
            id={expense._id.toString()}
            name={expense.name}
            amount={expense.amount}
            category={expense.category}
          />
        ))}
      </div>

      <div className="bg-gray-200 rounded-xl fixed top-3 text-black p-4 border-white border md:w-100 w-50 h-10 mx-auto flex items-center justify-between">
        <div className="font-bold text-lg text-gray-700">Total Expenses</div>
        <div className="font-bold">₹{total}</div>
      </div>

    </div>
  )
}