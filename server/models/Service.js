import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tagline: String,
    desc: String,
    price: String,
    duration: String,
    icon: String,
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
