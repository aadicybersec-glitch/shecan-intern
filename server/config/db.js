import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn("⚠️ MONGO_URI is not defined in environment variables.");
    console.warn("📡 Operating backend in robust Recruiter Local JSON File Fallback Mode.");
    return false;
  }
  try {
    const conn = await mongoose.connect(uri);
    console.log(`📡 MongoDB Core Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    console.warn("📡 Failing over safely to Recruiter Local JSON File Fallback Mode.");
    return false;
  }
};
export default connectDB;
