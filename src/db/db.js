import mongoose from "mongoose";

export async function connectWithDb() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB connection successful!");
}
