import { useEffect, useState } from "react";
import { CalendarClock, MapPin, ClipboardList, AlertTriangle } from "lucide-react";
import api from "../lib/api";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/professionals/my-jobs")
      .then((res) => setJobs(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Couldn't load your jobs.")
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="font-mono text-xs uppercase tracking-widest text-brass-dark">Accepted</p>
      <h1 className="mt-1 font-display text-3xl text-navy">My jobs</h1>

      {loading && <p className="mt-8 text-ink-soft">Loading…</p>}

      {error && (
        <div className="mt-6 flex items-start gap-2 rounded-xl border border-brass/40 bg-brass/10 px-4 py-3 text-sm text-brass-dark">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && jobs.length === 0 && (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-line bg-cream px-6 py-16 text-center">
          <ClipboardList className="text-ink-soft" size={32} />
          <p className="mt-4 text-ink-soft">You haven't accepted any orders yet.</p>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {jobs.map((j) => (
          <div key={j._id} className="rounded-2xl border border-line bg-cream p-5 shadow-ticket">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
              {j.ticketId}
            </p>
            <h3 className="mt-1 font-display text-lg text-navy">{j.serviceName}</h3>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
              <span className="flex items-center gap-1.5">
                <CalendarClock size={15} /> {j.date} · {j.slot}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={15} /> {j.address}
              </span>
              <span className="font-mono font-semibold text-navy">{j.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
