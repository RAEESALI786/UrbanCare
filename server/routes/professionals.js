import { Router } from "express";
import Professional from "../models/Professional.js";
import Booking from "../models/Booking.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Create or update the logged-in user's professional profile
router.post("/register", requireAuth, async (req, res) => {
  const { phone, city, category } = req.body;
  if (!phone || !city || !category) {
    return res.status(400).json({ message: "phone, city and category are required." });
  }

  try {
    const professional = await Professional.findOneAndUpdate(
      { uid: req.user.uid },
      {
        uid: req.user.uid,
        name: req.user.name,
        email: req.user.email,
        phone,
        city,
        category,
      },
      { upsert: true, new: true }
    );
    res.status(201).json(professional);
  } catch (err) {
    res.status(500).json({ message: "Could not save profile.", error: err.message });
  }
});

// Get the logged-in professional's own profile
router.get("/me", requireAuth, async (req, res) => {
  const professional = await Professional.findOne({ uid: req.user.uid });
  if (!professional) {
    return res.status(404).json({ message: "No professional profile found." });
  }
  res.json(professional);
});

// Orders that match this professional's city + category and aren't taken yet
router.get("/orders", requireAuth, async (req, res) => {
  const professional = await Professional.findOne({ uid: req.user.uid });
  if (!professional) {
    return res.status(404).json({ message: "Complete your professional profile first." });
  }

  const orders = await Booking.find({
    city: professional.city,
    serviceSlug: professional.category,
    assignedProfessionalUid: { $exists: false },
  }).sort({ createdAt: -1 });

  res.json(orders);
});

// Accept an order - assigns it to this professional
router.post("/orders/:id/accept", requireAuth, async (req, res) => {
  const professional = await Professional.findOne({ uid: req.user.uid });
  if (!professional) {
    return res.status(404).json({ message: "Complete your professional profile first." });
  }

  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: "Order not found." });
  }
  if (booking.assignedProfessionalUid) {
    return res.status(409).json({ message: "This order has already been accepted by someone else." });
  }
  if (booking.city !== professional.city || booking.serviceSlug !== professional.category) {
    return res.status(403).json({ message: "This order isn't in your city/category." });
  }

  booking.assignedProfessionalUid = professional.uid;
  booking.assignedProfessionalName = professional.name || professional.email;
  await booking.save();

  res.json(booking);
});

// Orders this professional has already accepted
router.get("/my-jobs", requireAuth, async (req, res) => {
  const jobs = await Booking.find({ assignedProfessionalUid: req.user.uid }).sort({
    createdAt: -1,
  });
  res.json(jobs);
});

export default router;
