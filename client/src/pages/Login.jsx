import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogIn, AlertTriangle } from "lucide-react";
import {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  firebaseReady,
} from "../lib/firebase";
import { friendlyError } from "../lib/authErrors";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setBusy(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate(from, { replace: true });
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setBusy(false);
    }
  };

  if (!firebaseReady) {
    return <FirebaseNotConfigured />;
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-5 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-brass-dark">
        Welcome back
      </p>
      <h1 className="mt-2 font-display text-3xl text-navy">Log in to UrbanCare</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <Field label="Email" type="email" value={email} onChange={setEmail} required />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          required
        />

        {error && <ErrorNote text={error} />}

        <button
          type="submit"
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-cream shadow-ticket transition-colors hover:bg-navy-2 disabled:opacity-60 focus-ring"
        >
          <LogIn size={16} />
          {busy ? "Logging in…" : "Log in"}
        </button>
      </form>

      <Divider />

      <button
        onClick={handleGoogle}
        disabled={busy}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-line bg-cream px-6 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-paper-2 disabled:opacity-60 focus-ring"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <p className="mt-8 text-center text-sm text-ink-soft">
        New here?{" "}
        <Link to="/signup" className="font-semibold text-navy underline decoration-brass underline-offset-4">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export function Field({ label, type, value, onChange, required }) {
  return (
    <label className="block text-left">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brass focus-ring"
      />
    </label>
  );
}

export function Divider() {
  return (
    <div className="my-6 flex items-center gap-3">
      <div className="h-px flex-1 bg-line" />
      <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">or</span>
      <div className="h-px flex-1 bg-line" />
    </div>
  );
}

export function ErrorNote({ text }) {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-brass/40 bg-brass/10 px-4 py-3 text-sm text-brass-dark">
      <AlertTriangle size={16} className="mt-0.5 shrink-0" />
      <span>{text}</span>
    </div>
  );
}

export function FirebaseNotConfigured() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-5 text-center">
      <AlertTriangle className="text-brass-dark" size={32} />
      <h1 className="mt-4 font-display text-2xl text-navy">Firebase isn't configured yet</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Add your Firebase project keys to <code className="font-mono">client/.env</code> (see{" "}
        <code className="font-mono">.env.example</code>) to enable login.
      </p>
    </div>
  );
}

export function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.9 5.5 29.8 3.5 24 3.5 12.7 3.5 3.5 12.7 3.5 24S12.7 44.5 24 44.5 44.5 35.3 44.5 24c0-1.2-.1-2.4-.3-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.7 18.9 12.5 24 12.5c3.1 0 5.8 1.1 8 3l6-6C34.9 5.5 29.8 3.5 24 3.5c-7.9 0-14.7 4.4-17.7 11.2z"
      />
      <path
        fill="#4CAF50"
        d="M24 44.5c5.7 0 10.7-1.9 14.5-5.1l-6.7-5.5c-2 1.4-4.7 2.4-7.8 2.4-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.2 39.9 16 44.5 24 44.5z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.7 5.5c-.5.4 7.2-5.3 7.2-15.7 0-1.2-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}
