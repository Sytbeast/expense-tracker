import mongoose from "mongoose";

const connectDb = async() => {
    // checking for already in connection
    if(mongoose.connection.readyState === 1){
        return
    }
    // if not connected then connect the database
    await mongoose.connect(process.env.MONGODB_URI!)
}

export default connectDb