import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_CONNECT);
        console.log('Database is connected!');
    }catch(error){
        console.error("Database is not connected");
    }
}

export default connectDB;