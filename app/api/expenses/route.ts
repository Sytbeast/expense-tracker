import connectDb from "@/lib/db";
import Expense from "@/models/Expense";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await connectDb();

    const expenses = await Expense.find();
    return NextResponse.json(expenses);
}

export async function POST(req: NextRequest){
    await connectDb();

    const data = await req.json()
    await Expense.create(data)

    return NextResponse.json("Created expense successfully")

}

export async function DELETE(req: NextRequest){
    await connectDb();

    const { id } = await req.json()
    await Expense.findByIdAndDelete(id)

    return NextResponse.json("Delete Success!!")
}


