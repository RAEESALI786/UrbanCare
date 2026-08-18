import mongoose from "mongoose";

const professionalSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true }, // Firebase uid
    name: String,
    email: String,
    phone: { type: String, required: true },
    city: { type: String, required: true },
    category: { type: String, required: true }, // matches a serviceSlug
  },
  { timestamps: true }
);

export default mongoose.model("Professional", professionalSchema);
