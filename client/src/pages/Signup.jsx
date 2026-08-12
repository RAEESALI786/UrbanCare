import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import {
  auth,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  firebaseReady,
} from "../lib/firebase";
import { friendlyError } from "../lib/authErrors";
import { Field, Divider, ErrorNote, FirebaseNotConfigured, GoogleIcon } from "./Login";

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
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }
      navigate("/", { replace: true });
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
      navigate("/", { replace: true });
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
        Get started
      </p>
      <h1 className="mt-2 font-display text-3xl text-navy">Create your account</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <Field label="Full name" type="text" value={name} onChange={setName} />
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
          <UserPlus size={16} />
          {busy ? "Creating account…" : "Create account"}
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
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-navy underline decoration-brass underline-offset-4">
          Log in
        </Link>
      </p>
    </div>
  );
}
