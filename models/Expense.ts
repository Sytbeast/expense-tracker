import mongoose, { model } from "mongoose";

interface IExpense{
    name:string;
    amount:number;
    category:string;
    createdAt:Date;
}

const ExpenseSchema = new mongoose.Schema<IExpense>({
    name:{type: String , required:true},
    amount:{type:Number, required:true},
    category:{type:String, required:true},
} , {timestamps:true})

export default  mongoose.models.Expense || mongoose.model<IExpense>("Expense", ExpenseSchema)