import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, AlertTriangle } from "lucide-react";
import { auth, createUserWithEmailAndPassword, updateProfile, firebaseReady } from "../lib/firebase";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) await updateProfile(cred.user, { displayName: name });
      navigate("/register-profile", { replace: true });
    } catch (err) {
      setError(err.code === "auth/email-already-in-use" ? "An account with that email already exists." : "Something went wrong. Please try again.");
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
      <p className="font-mono text-xs uppercase tracking-widest text-brass-dark">Join UrbanCare</p>
      <h1 className="mt-2 font-display text-3xl text-navy">Register as a professional</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Create your login first — you'll set your city and service category next.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink">Full name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-brass focus-ring"
          />
        </label>
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
          <UserPlus size={16} />
          {busy ? "Creating account…" : "Continue"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-ink-soft">
        Already registered?{" "}
        <Link to="/login" className="font-semibold text-navy underline decoration-brass underline-offset-4">
          Log in
        </Link>
      </p>
    </div>
  );
}
