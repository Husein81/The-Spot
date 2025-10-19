import mongoose from "mongoose";

export const connectOrderDB = async () => {
  if (!process.env.MONGODB_URL) {
    console.error("MongoDB URL is not defined");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
