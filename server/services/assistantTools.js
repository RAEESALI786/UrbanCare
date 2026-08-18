import {
  SERVICES,
  BHK_OPTIONS,
  PAINT_TYPES,
  ADD_ONS,
  BUY_OWN_PAINT_DISCOUNT,
  formatINR,
} from "../data/catalog.js";
import Booking from "../models/Booking.js";

function generateTicketId() {
  const n = Math.floor(10000 + Math.random() * 89999);
  return `UC-${n}`;
}

// Tool schemas passed to the Claude API
export const TOOLS = [
  {
    name: "list_services",
    description:
      "Returns the full list of services UrbanCare offers, with fixed prices and durations where applicable. Painting has no fixed price — use quote_painting for that instead.",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "quote_painting",
    description:
      "Calculates an exact price for a home painting job given the home size, who supplies the paint, the paint finish (if UrbanCare supplies it), and any add-ons. Always call this before telling the user a painting price — never estimate it yourself.",
    input_schema: {
      type: "object",
      properties: {
        bhk: {
          type: "string",
          enum: Object.keys(BHK_OPTIONS),
          description: "Home size code: 1bhk, 2bhk, 3bhk, or 5bhk",
        },
        suppliesOwnPaint: {
          type: "boolean",
          description: "true if the customer will buy their own paint (labour-only, cheaper)",
        },
        paintType: {
          type: "string",
          enum: Object.keys(PAINT_TYPES),
          description: "Required only when suppliesOwnPaint is false",
        },
        addonIds: {
          type: "array",
          items: { type: "string", enum: Object.keys(ADD_ONS) },
          description: "Optional add-ons the customer wants",
        },
      },
      required: ["bhk", "suppliesOwnPaint"],
    },
  },
  {
    name: "create_booking",
    description:
      "Creates a real, confirmed booking for the logged-in user. Only call this after the user has explicitly confirmed the service, date, time slot, address, and price out loud in the conversation — never book without clear confirmation.",
    input_schema: {
      type: "object",
      properties: {
        serviceSlug: { type: "string", description: "Slug of the service, e.g. 'plumbing' or 'painting'" },
        serviceName: { type: "string", description: "Human-readable service name to store on the booking" },
        price: { type: "string", description: "Display price, e.g. '₹549' or the painting quote total" },
        date: { type: "string", description: "Booking date, format YYYY-MM-DD" },
        slot: { type: "string", description: "Time slot, e.g. '3:00 PM'" },
        address: { type: "string", description: "Full service address" },
        notes: { type: "string", description: "Optional notes, e.g. selected painting add-ons" },
      },
      required: ["serviceSlug", "serviceName", "price", "date", "slot", "address"],
    },
  },
];

function listServices() {
  return SERVICES;
}

function quotePainting({ bhk, suppliesOwnPaint, paintType, addonIds = [] }) {
  const bhkInfo = BHK_OPTIONS[bhk];
  if (!bhkInfo) return { error: `Unknown bhk value: ${bhk}` };

  const breakdown = [{ label: `${bhkInfo.label} — base package`, amount: bhkInfo.basePrice }];

  if (suppliesOwnPaint) {
    breakdown.push({ label: "Customer supplies paint (labour only)", amount: -BUY_OWN_PAINT_DISCOUNT });
  } else {
    const paint = PAINT_TYPES[paintType];
    if (!paint) return { error: `Missing or unknown paintType: ${paintType}` };
    if (paint.priceAdjustment !== 0) {
      breakdown.push({ label: paint.label, amount: paint.priceAdjustment });
    }
  }

  for (const id of addonIds) {
    const addon = ADD_ONS[id];
    if (addon) breakdown.push({ label: addon.label, amount: addon.price });
  }

  const total = breakdown.reduce((sum, i) => sum + i.amount, 0);
  return { breakdown, total, totalFormatted: formatINR(total) };
}

async function createBooking(args, user) {
  if (!user) {
    return { error: "User is not logged in. Ask them to log in before booking." };
  }
  const { serviceSlug, serviceName, price, date, slot, address, notes } = args;
  const booking = await Booking.create({
    ticketId: generateTicketId(),
    userId: user.uid,
    userEmail: user.email,
    serviceSlug,
    serviceName,
    price,
    date,
    slot,
    address,
    notes,
  });
  return {
    success: true,
    ticketId: booking.ticketId,
    serviceName: booking.serviceName,
    date: booking.date,
    slot: booking.slot,
    price: booking.price,
  };
}

// Executes a single tool call by name and returns a JSON-serializable result
export async function runTool(name, input, user) {
  switch (name) {
    case "list_services":
      return listServices();
    case "quote_painting":
      return quotePainting(input);
    case "create_booking":
      return createBooking(input, user);
    default:
      return { error: `Unknown tool: ${name}` };
  }
}
