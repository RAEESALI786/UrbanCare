export const SERVICES = [
  {
    slug: "home-cleaning",
    name: "Home Cleaning",
    desc: "A trained two-person crew cleans kitchens, bathrooms, floors and windows with hospital-grade equipment.",
    price: "₹649",
    duration: "2–3 hrs",
  },
  {
    slug: "salon-for-women",
    name: "Salon at Home",
    desc: "Facials, waxing, threading, manicure and haircuts, done with certified salon-grade products.",
    price: "₹499",
    duration: "60–90 min",
  },
  {
    slug: "ac-repair",
    name: "AC Repair & Service",
    desc: "Gas top-up, deep foam cleaning, and diagnostics for split and window units, with a 30-day repair warranty.",
    price: "₹549",
    duration: "45–60 min",
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    desc: "Tap and pipe leak repair, bathroom fitting installation, and blockage clearing by licensed plumbers.",
    price: "₹199",
    duration: "30–45 min",
  },
  {
    slug: "electrician",
    name: "Electrician",
    desc: "Switchboard repair, fan and light installation, and wiring fixes from electricians who carry their own tools.",
    price: "₹149",
    duration: "20–40 min",
  },
  {
    slug: "painting",
    name: "Home Painting",
    desc: "Full-home painting priced by home size, paint finish, and whether UrbanCare or the customer supplies the paint. Use the painting price tool to quote this one — it is not a fixed price.",
    price: "from ₹8,999 (variable — always quote with the tool)",
    duration: "1–4 days",
  },
];

export const BHK_OPTIONS = {
  "1bhk": { label: "1 BHK", basePrice: 8999 },
  "2bhk": { label: "2 BHK", basePrice: 13999 },
  "3bhk": { label: "3 BHK", basePrice: 18999 },
  "5bhk": { label: "5 BHK", basePrice: 27999 },
};

export const PAINT_TYPES = {
  distemper: { label: "Distemper", priceAdjustment: 0 },
  emulsion: { label: "Emulsion Paint", priceAdjustment: 2000 },
  royal: { label: "Royal / Premium Emulsion", priceAdjustment: 4500 },
  weatherproof: { label: "Weatherproof Exterior", priceAdjustment: 3500 },
};

export const ADD_ONS = {
  "remove-old-paint": { label: "Remove old paint (scraping)", price: 1500 },
  "putty-primer": { label: "Wall putty & primer coat", price: 1200 },
  ceiling: { label: "Ceiling painting", price: 1800 },
};

export const BUY_OWN_PAINT_DISCOUNT = 3500;

export function formatINR(n) {
  return `₹${n.toLocaleString("en-IN")}`;
}