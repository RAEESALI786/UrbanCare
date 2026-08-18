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
    addressLat: Number,
    addressLng: Number,
    city: String, // customer's selected city at checkout - used to match professionals
    notes: String,
    workerName: String,
    assignedProfessionalUid: String,
    assignedProfessionalName: String,
    advanceAmount: Number,
    remainingAmount: Number,
    paymentStatus: {
      type: String,
      enum: ["advance_paid", "fully_paid"],
      default: "advance_paid",
    },
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
