import { Router } from "express";
import Booking from "../models/Booking.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

function generateTicketId() {
  const n = Math.floor(10000 + Math.random() * 89999);
  return `UC-${n}`;
}

// Create a booking
router.post("/", requireAuth, async (req, res) => {
  const { serviceSlug, serviceName, price, date, slot, address, notes, breakdown, workerName } = req.body;

  if (!serviceSlug || !serviceName || !date || !slot || !address) {
    return res.status(400).json({ message: "Missing required booking fields." });
  }

  try {
    const booking = await Booking.create({
      ticketId: generateTicketId(),
      userId: req.user.uid,
      userEmail: req.user.email,
      serviceSlug,
      serviceName,
      price,
      date,
      slot,
      address,
      notes,
      breakdown,
      workerName,
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Could not create booking.", error: err.message });
  }
});

// List the logged-in user's bookings, most recent first
router.get("/me", requireAuth, async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.uid }).sort({ createdAt: -1 });
  res.json(bookings);
});

export default router;
