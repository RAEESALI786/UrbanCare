import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarClock, MapPin, AlertTriangle, Inbox } from "lucide-react";
import api from "../lib/api";

const STATUS_STYLES = {
  confirmed: "border-ok text-ok",
  completed: "border-navy text-navy",
  cancelled: "border-brass-dark text-brass-dark",
};

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    api
      .get("/bookings/me")
      .then((res) => mounted && setBookings(res.data))
      .catch(() =>
        mounted &&
        setError(
          "Couldn't load your bookings. Make sure the backend server is running and connected to MongoDB."
        )
      )
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="font-mono text-xs uppercase tracking-widest text-brass-dark">Your tickets</p>
      <h1 className="mt-2 font-display text-3xl text-navy">My bookings</h1>

      {loading && <p className="mt-8 text-ink-soft">Loading your bookings…</p>}

      {error && (
        <div className="mt-8 flex items-start gap-2 rounded-xl border border-brass/40 bg-brass/10 px-4 py-3 text-sm text-brass-dark">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-line bg-cream px-6 py-16 text-center">
          <Inbox className="text-ink-soft" size={32} />
          <p className="mt-4 text-ink-soft">No bookings yet — your job tickets will show up here.</p>
          <Link
            to="/#services"
            className="mt-5 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream focus-ring"
          >
            Book a service
          </Link>
        </div>
      )}

      <div className="mt-8 space-y-4">
        {bookings.map((b) => (
          <div key={b._id} className="rounded-2xl border border-line bg-cream p-5 shadow-ticket">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                  {b.ticketId}
                </p>
                <h3 className="mt-1 font-display text-lg text-navy">{b.serviceName}</h3>
                {b.workerName && (
                  <p className="mt-0.5 text-xs text-ink-soft">Professional: {b.workerName}</p>
                )}
              </div>
              <span
                className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                  STATUS_STYLES[b.status] || "border-line text-ink-soft"
                }`}
              >
                {b.status}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
              <span className="flex items-center gap-1.5">
                <CalendarClock size={15} /> {b.date} · {b.slot}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={15} /> {b.address}
              </span>
              <span className="font-mono font-semibold text-navy">{b.price}</span>
            </div>

            {b.breakdown?.length > 0 && (
              <div className="perforation mt-4 pt-3">
                <dl className="space-y-1 text-xs">
                  {b.breakdown.map((item, i) => (
                    <div key={i} className="flex justify-between">
                      <dt className="text-ink-soft">{item.label}</dt>
                      <dd className="font-mono text-ink-soft">
                        {item.amount < 0 ? "−" : ""}₹{Math.abs(item.amount).toLocaleString("en-IN")}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
