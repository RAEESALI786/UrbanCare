import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { CalendarClock, MapPin, CheckCircle2, AlertTriangle, ClipboardList, Wallet } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLocationCity } from "../context/LocationContext";
import { isServiceable } from "../lib/serviceCities";
import AddressMapPicker from "../components/AddressMapPicker";
import useScrollToError from "../lib/useScrollToError";
import api from "../lib/api";

const SLOTS = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"];
const ADVANCE_RATE = 0.1; // customer pays 10% now, 90% after the job is done
const PENDING_ORDER_KEY = "urbancare_pending_order";

// Pulls a plain number out of a display price string like "₹21,799" or
// "₹2,999 per room" so we can compute the 10% advance.
function parsePrice(priceStr) {
  if (!priceStr) return 0;
  const digitsOnly = priceStr.replace(/[^\d]/g, "");
  return digitsOnly ? parseInt(digitsOnly, 10) : 0;
}

function formatINR(n) {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

/**
 * Shared checkout step for every service/product on the site.
 * Expects router state of the shape:
 *   { serviceSlug, serviceName, price, breakdown? (array of {label, amount}), notes? }
 * Pages that let the user pick options (painting, salon, etc.) build that
 * object and navigate("/checkout", { state }) once the user is ready.
 */
export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { city } = useLocationCity();

  // location.state doesn't survive the "log in, then get redirected back"
  // round trip — navigate() after login only carries a plain path, no state.
  // So: whenever we DO have a real order from router state, persist it to
  // sessionStorage; whenever we don't, fall back to whatever was saved.
  let order = location.state;
  if (order?.serviceSlug) {
    sessionStorage.setItem(PENDING_ORDER_KEY, JSON.stringify(order));
  } else {
    const saved = sessionStorage.getItem(PENDING_ORDER_KEY);
    if (saved) {
      try {
        order = JSON.parse(saved);
      } catch {
        order = null;
      }
    }
  }

  const serviceable = isServiceable(city);

  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(SLOTS[0]);
  const [address, setAddress] = useState("");
  const [addressCoords, setAddressCoords] = useState(null);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [notes, setNotes] = useState(order?.notes || "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const errorRef = useScrollToError(error);
  const [confirmed, setConfirmed] = useState(null);

  // No order was handed off (e.g. someone navigated to /checkout directly)
  if (!order?.serviceSlug) {
    return (
      <div className="mx-auto max-w-md px-5 py-20 text-center">
        <ClipboardList className="mx-auto text-ink-soft" size={40} />
        <h1 className="mt-4 font-display text-2xl text-navy">Nothing to check out yet</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Pick a service first and we'll bring you here to finish booking it.
        </p>
        <Link
          to="/#services"
          className="mt-6 inline-block rounded-full bg-navy px-6 py-3 text-sm font-semibold text-cream focus-ring"
        >
          Browse services
        </Link>
      </div>
    );
  }

  const total = parsePrice(order.price);
  const advanceAmount = Math.round(total * ADVANCE_RATE);
  const remainingAmount = total - advanceAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!serviceable) {
      setError(
        city
          ? `We don't currently operate in ${city}. Please choose a serviceable city from the location menu above.`
          : "Please select your city from the location menu above before booking."
      );
      return;
    }
    if (!user) {
      setError("Please log in to confirm your booking.");
      return;
    }
    setBusy(true);
    try {
      const res = await api.post("/bookings", {
        serviceSlug: order.serviceSlug,
        serviceName: order.serviceName,
        price: order.price,
        date,
        slot,
        address,
        addressLat: addressCoords?.lat,
        addressLng: addressCoords?.lng,
        city,
        notes,
        breakdown: order.breakdown,
        workerName: order.workerName,
        advanceAmount,
        remainingAmount,
      });
      setConfirmed(res.data);
      sessionStorage.removeItem(PENDING_ORDER_KEY);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Couldn't reach the booking server. Make sure the backend is running."
      );
    } finally {
      setBusy(false);
    }
  };

  if (confirmed) {
    return (
      <div className="mx-auto max-w-md px-5 py-20 text-center">
        <CheckCircle2 className="mx-auto text-ok" size={48} />
        <h1 className="mt-5 font-display text-3xl text-navy">Job ticket confirmed</h1>
        <p className="mt-2 text-ink-soft">
          Ticket <span className="font-mono">{confirmed.ticketId}</span> for {order.serviceName}{" "}
          on {date} at {slot}.
        </p>
        <div className="mx-auto mt-6 max-w-xs rounded-xl border border-line bg-cream p-4 text-left text-sm shadow-ticket">
          <div className="flex justify-between">
            <span className="text-ink-soft">Paid now (10% advance)</span>
            <span className="font-mono font-semibold text-navy">{formatINR(advanceAmount)}</span>
          </div>
          <div className="mt-1.5 flex justify-between">
            <span className="text-ink-soft">Due after service</span>
            <span className="font-mono font-semibold text-navy">{formatINR(remainingAmount)}</span>
          </div>
        </div>
        <Link
          to="/bookings"
          className="mt-8 inline-block rounded-full bg-navy px-6 py-3 text-sm font-semibold text-cream focus-ring"
        >
          View my bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <p className="font-mono text-xs uppercase tracking-widest text-brass-dark">Checkout</p>
      <h1 className="mt-2 font-display text-3xl text-navy">Confirm your booking</h1>

      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.1fr]">
        {/* Order summary */}
        <div className="rounded-2xl border border-line bg-cream p-6 shadow-ticket">
          <h2 className="font-display text-lg text-navy">Order summary</h2>

          <p className="mt-3 font-semibold text-navy">{order.serviceName}</p>
          {order.workerName && (
            <p className="mt-1 text-sm text-ink-soft">Professional: {order.workerName}</p>
          )}

          {order.breakdown?.length > 0 && (
            <dl className="mt-4 space-y-2 text-sm">
              {order.breakdown.map((item, i) => (
                <div key={i} className="flex justify-between gap-3">
                  <dt className="text-ink-soft">{item.label}</dt>
                  <dd className={`shrink-0 font-mono ${item.amount < 0 ? "text-ok" : "text-navy"}`}>
                    {item.amount < 0 ? "−" : ""}₹{Math.abs(item.amount).toLocaleString("en-IN")}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="perforation my-5" />
          <div className="flex items-center justify-between">
            <span className="font-display text-base text-navy">Total</span>
            <span className="font-mono text-xl font-semibold text-navy">{order.price}</span>
          </div>

          <div className="perforation my-5" />

          <div className="rounded-xl border border-brass/40 bg-brass/10 p-4">
            <div className="flex items-center gap-2 text-brass-dark">
              <Wallet size={16} />
              <span className="text-sm font-semibold">Pay in two parts</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-ink-soft">Pay now to confirm (10%)</span>
              <span className="font-mono font-semibold text-navy">{formatINR(advanceAmount)}</span>
            </div>
            <div className="mt-1.5 flex items-center justify-between text-sm">
              <span className="text-ink-soft">Due after the service (90%)</span>
              <span className="font-mono font-semibold text-navy">{formatINR(remainingAmount)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 text-xs font-semibold text-ink-soft underline decoration-line underline-offset-4 hover:text-navy"
          >
            ← Change selection
          </button>
        </div>

        {/* Checkout form */}
        <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-cream p-6 shadow-ticket">
          <h2 className="font-display text-lg text-navy">Schedule &amp; address</h2>

          {!serviceable && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-brass/40 bg-brass/10 px-4 py-3 text-sm text-brass-dark">
              <AlertTriangle size={16} className="mt-0.5 shrink-0" />
              <span>
                {city
                  ? `We don't currently operate in ${city}. Choose a serviceable city from the location menu at the top of the page to continue.`
                  : "Select your city from the location menu at the top of the page to continue."}
              </span>
            </div>
          )}

          <label className="mt-4 block">
            <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink">
              <CalendarClock size={15} /> Date
            </span>
            <input
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-brass focus-ring"
            />
          </label>

          <div className="mt-4">
            <span className="mb-1.5 block text-sm font-medium text-ink">Time slot</span>
            <div className="grid grid-cols-3 gap-2">
              {SLOTS.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setSlot(s)}
                  className={`rounded-lg border px-2 py-2 text-xs font-medium transition-colors focus-ring ${
                    slot === s
                      ? "border-navy bg-navy text-cream"
                      : "border-line bg-paper text-ink-soft hover:border-brass"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <label className="mt-4 block">
            <span className="mb-1.5 flex items-center justify-between text-sm font-medium text-ink">
              <span className="flex items-center gap-1.5">
                <MapPin size={15} /> Address
              </span>
              <button
                type="button"
                onClick={() => setShowMapPicker(true)}
                className="text-xs font-semibold text-brass-dark underline decoration-brass underline-offset-2 hover:text-navy"
              >
                Pin on map
              </button>
            </span>
            <input
              type="text"
              required
              placeholder="Flat / House no., street, area"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-brass focus-ring"
            />
          </label>

          {showMapPicker && (
            <AddressMapPicker
              onClose={() => setShowMapPicker(false)}
              onConfirm={({ address: pickedAddress, lat, lng }) => {
                setAddress(pickedAddress);
                setAddressCoords({ lat, lng });
                setShowMapPicker(false);
              }}
            />
          )}

          <label className="mt-4 block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Notes (optional)</span>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full resize-none rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-brass focus-ring"
            />
          </label>

          {error && (
            <div ref={errorRef} className="mt-4 flex items-start gap-2 rounded-xl border border-brass/40 bg-brass/10 px-4 py-3 text-sm text-brass-dark">
              <AlertTriangle size={16} className="mt-0.5 shrink-0" />
              <span>
                {error}{" "}
                {!user && (
                  <Link to="/login" state={{ from: { pathname: "/checkout" } }} className="underline">
                    Log in
                  </Link>
                )}
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={busy || !serviceable}
            className="mt-5 w-full rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-cream shadow-ticket transition-colors hover:bg-navy-2 disabled:opacity-60 focus-ring"
          >
            {busy ? "Confirming…" : `Pay ${formatINR(advanceAmount)} now to confirm`}
          </button>
          <p className="mt-2 text-center text-xs text-ink-soft">
            Remaining {formatINR(remainingAmount)} is due after the service is completed.
          </p>
        </form>
      </div>
    </div>
  );
}