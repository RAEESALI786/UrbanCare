import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { CITIES, CATEGORIES } from "../lib/constants";
import api from "../lib/api";

export default function RegisterProfile() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState(CITIES[0]);
  const [category, setCategory] = useState(CATEGORIES[0].slug);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await api.post("/professionals/register", { phone, city, category });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Couldn't save your profile. Make sure the backend is running."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-5 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-brass-dark">Almost done</p>
      <h1 className="mt-2 font-display text-3xl text-navy">Set up your profile</h1>
      <p className="mt-2 text-sm text-ink-soft">
        You'll only be shown orders that match your city and category — pick carefully.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Phone number</span>
          <input
            type="tel"
            required
            placeholder="10-digit mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-brass focus-ring"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Your city</span>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-brass focus-ring"
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Service category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-brass focus-ring"
          >
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-brass/40 bg-brass/10 px-4 py-3 text-sm text-brass-dark">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-cream shadow-ticket hover:bg-navy-2 disabled:opacity-60 focus-ring"
        >
          <CheckCircle2 size={16} />
          {busy ? "Saving…" : "Start receiving orders"}
        </button>
      </form>
    </div>
  );
}
