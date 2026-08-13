import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    ticketId: { type: String, required: true, unique: true },
    userId: { type: String, required: true }, // Firebase uid
    userEmail: String,
    serviceSlug: { type: String, required: true },
    serviceName: { type: String, required: true },
    price: String,
    date: { type: String, required: true },
    slot: { type: String, required: true },
    address: { type: String, required: true },
    notes: String,
    workerName: String,
    breakdown: [
      {
        label: String,
        amount: Number,
      },
    ],
    status: {
      type: String,
      enum: ["confirmed", "completed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
