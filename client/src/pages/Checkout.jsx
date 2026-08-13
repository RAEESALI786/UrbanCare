import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { CalendarClock, MapPin, CheckCircle2, AlertTriangle, ClipboardList } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";

const SLOTS = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"];

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
  const order = location.state;

  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(SLOTS[0]);
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState(order?.notes || "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
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
        notes,
        breakdown: order.breakdown,
        workerName: order.workerName,
      });
      setConfirmed(res.data);
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
          on {date} at {slot}, total {order.price}.
        </p>
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
            <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink">
              <MapPin size={15} /> Address
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
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-brass/40 bg-brass/10 px-4 py-3 text-sm text-brass-dark">
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
            disabled={busy}
            className="mt-5 w-full rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-cream shadow-ticket transition-colors hover:bg-navy-2 disabled:opacity-60 focus-ring"
          >
            {busy ? "Confirming…" : `Confirm booking · ${order.price}`}
          </button>
        </form>
      </div>
    </div>
  );
}
