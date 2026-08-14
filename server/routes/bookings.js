import { Router } from "express";
import Booking from "../models/Booking.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const ADVANCE_RATE = 0.1; // customer pays 10% now, 90% after the job is done

function generateTicketId() {
  const n = Math.floor(10000 + Math.random() * 89999);
  return `UC-${n}`;
}

// Pulls a plain number out of a display price string like "₹21,799" or
// "₹2,999 per room". Computed server-side so the 10% split can't be
// tampered with by trusting client-supplied amounts.
function parsePrice(priceStr) {
  if (!priceStr) return 0;
  const digitsOnly = String(priceStr).replace(/[^\d]/g, "");
  return digitsOnly ? parseInt(digitsOnly, 10) : 0;
}

// Create a booking
router.post("/", requireAuth, async (req, res) => {
  const { serviceSlug, serviceName, price, date, slot, address, notes, breakdown, workerName } = req.body;

  if (!serviceSlug || !serviceName || !date || !slot || !address) {
    return res.status(400).json({ message: "Missing required booking fields." });
  }

  const total = parsePrice(price);
  const advanceAmount = Math.round(total * ADVANCE_RATE);
  const remainingAmount = total - advanceAmount;

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
      advanceAmount,
      remainingAmount,
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
