import "dotenv/config";
import { connectDB } from "./config/db.js";
import Service from "./models/Service.js";
import mongoose from "mongoose";

const SERVICES = [
  {
    slug: "home-cleaning",
    name: "Home Cleaning",
    tagline: "Deep clean, top to bottom",
    desc: "A trained two-person crew cleans kitchens, bathrooms, floors and windows with hospital-grade equipment.",
    price: "₹649",
    duration: "2–3 hrs",
    icon: "sparkles",
  },
  {
    slug: "salon-for-women",
    name: "Salon at Home",
    tagline: "Studio-grade beauty, at your door",
    desc: "Facials, waxing, threading, manicure and haircuts, done with certified salon-grade products.",
    price: "₹499",
    duration: "60–90 min",
    icon: "scissors",
  },
  {
    slug: "ac-repair",
    name: "AC Repair & Service",
    tagline: "Cool air, guaranteed",
    desc: "Gas top-up, deep foam cleaning, and diagnostics for split and window units, with a 30-day repair warranty.",
    price: "₹549",
    duration: "45–60 min",
    icon: "wind",
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    tagline: "Leaks, taps & fittings, fixed",
    desc: "Tap and pipe leak repair, bathroom fitting installation, and blockage clearing by licensed plumbers.",
    price: "₹199",
    duration: "30–45 min",
    icon: "wrench",
  },
  {
    slug: "electrician",
    name: "Electrician",
    tagline: "Safe wiring, done right",
    desc: "Switchboard repair, fan and light installation, and wiring fixes from electricians who carry their own tools.",
    price: "₹149",
    duration: "20–40 min",
    icon: "zap",
  },
  {
    slug: "painting",
    name: "Home Painting",
    tagline: "Full-home painting, priced upfront",
    desc: "Pick your home size, paint finish, and whether you'd like us to supply the paint — see the full price before you book.",
    price: "from ₹8,999",
    duration: "1–4 days",
    icon: "paintbrush",
  },
];

async function seed() {
  await connectDB();
  for (const s of SERVICES) {
    await Service.findOneAndUpdate({ slug: s.slug }, s, { upsert: true, returnDocument: "after" });
  }
  console.log(`Seeded ${SERVICES.length} services.`);
  await mongoose.disconnect();
  process.exit(0);
}

seed();
