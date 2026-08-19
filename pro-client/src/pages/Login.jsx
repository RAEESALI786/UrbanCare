import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, AlertTriangle } from "lucide-react";
import { auth, signInWithEmailAndPassword, firebaseReady } from "../lib/firebase";
import useScrollToError from "../lib/useScrollToError";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const errorRef = useScrollToError(error);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError("Incorrect email or password.");
    } finally {
      setBusy(false);
    }
  };

  if (!firebaseReady) {
    return (
      <div className="mx-auto max-w-md px-5 py-20 text-center">
        <AlertTriangle className="mx-auto text-brass-dark" size={32} />
        <h1 className="mt-4 font-display text-2xl text-navy">Firebase isn't configured yet</h1>
        <p className="mt-2 text-sm text-ink-soft">Add your Firebase keys to pro-client/.env.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-5 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-brass-dark">Welcome back</p>
      <h1 className="mt-2 font-display text-3xl text-navy">Professional log in</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-brass focus-ring"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-brass focus-ring"
          />
        </label>

        {error && (
          <div ref={errorRef} className="flex items-start gap-2 rounded-xl border border-brass/40 bg-brass/10 px-4 py-3 text-sm text-brass-dark">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-cream shadow-ticket hover:bg-navy-2 disabled:opacity-60 focus-ring"
        >
          <LogIn size={16} />
          {busy ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-ink-soft">
        New professional?{" "}
        <Link to="/signup" className="font-semibold text-navy underline decoration-brass underline-offset-4">
          Register here
        </Link>
      </p>
    </div>
  );
}