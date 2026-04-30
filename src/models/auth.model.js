import mongoose from "mongoose";
// schema and model

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true, required: true },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
