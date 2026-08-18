import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarClock, MapPin, Inbox, AlertTriangle, RefreshCw } from "lucide-react";
import api from "../lib/api";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [acceptingId, setAcceptingId] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const meRes = await api.get("/professionals/me");
      setProfile(meRes.data);
      const ordersRes = await api.get("/professionals/orders");
      setOrders(ordersRes.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("PROFILE_MISSING");
      } else {
        setError(
          err.response?.data?.message ||
            "Couldn't load orders. Make sure the backend is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAccept = async (id) => {
    setAcceptingId(id);
    try {
      await api.post(`/professionals/orders/${id}/accept`);
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't accept this order.");
    } finally {
      setAcceptingId(null);
    }
  };

  if (error === "PROFILE_MISSING") {
    return (
      <div className="mx-auto max-w-md px-5 py-20 text-center">
        <AlertTriangle className="mx-auto text-brass-dark" size={32} />
        <h1 className="mt-4 font-display text-2xl text-navy">Finish setting up your profile</h1>
        <p className="mt-2 text-sm text-ink-soft">
          We need your city and category before we can show you orders.
        </p>
        <Link
          to="/register-profile"
          className="mt-6 inline-block rounded-full bg-navy px-6 py-3 text-sm font-semibold text-cream focus-ring"
        >
          Complete profile
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-brass-dark">
            {profile ? `${profile.city} · ${profile.category}` : "Loading…"}
          </p>
          <h1 className="mt-1 font-display text-3xl text-navy">Available orders</h1>
        </div>
        <button
          type="button"
          onClick={load}
          className="flex items-center gap-1.5 rounded-full border border-line bg-cream px-4 py-2 text-sm font-medium text-navy hover:border-brass/50 focus-ring"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {loading && <p className="mt-8 text-ink-soft">Loading orders…</p>}

      {error && error !== "PROFILE_MISSING" && (
        <div className="mt-6 flex items-start gap-2 rounded-xl border border-brass/40 bg-brass/10 px-4 py-3 text-sm text-brass-dark">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-line bg-cream px-6 py-16 text-center">
          <Inbox className="text-ink-soft" size={32} />
          <p className="mt-4 text-ink-soft">
            No orders waiting in {profile?.city} for {profile?.category} right now.
          </p>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {orders.map((o) => (
          <div key={o._id} className="rounded-2xl border border-line bg-cream p-5 shadow-ticket">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                  {o.ticketId}
                </p>
                <h3 className="mt-1 font-display text-lg text-navy">{o.serviceName}</h3>
              </div>
              <span className="font-mono text-base font-semibold text-navy">{o.price}</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
              <span className="flex items-center gap-1.5">
                <CalendarClock size={15} /> {o.date} · {o.slot}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={15} /> {o.address}
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleAccept(o._id)}
              disabled={acceptingId === o._id}
              className="mt-4 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream hover:bg-navy-2 disabled:opacity-60 focus-ring"
            >
              {acceptingId === o._id ? "Accepting…" : "Accept order"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
