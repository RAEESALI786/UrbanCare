import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-brass-dark">
        For professionals
      </p>
      <h1 className="mt-3 font-display text-4xl text-navy sm:text-5xl">
        Get job orders in your own city.
      </h1>
      <p className="mt-4 text-lg text-ink-soft">
        Register once with your city and service category, and only see the orders that
        actually match where you work.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {user ? (
          <Link
            to="/dashboard"
            className="rounded-full bg-navy px-8 py-3.5 text-sm font-semibold text-cream shadow-ticket hover:bg-navy-2 focus-ring"
          >
            View orders
          </Link>
        ) : (
          <>
            <Link
              to="/signup"
              className="rounded-full bg-navy px-8 py-3.5 text-sm font-semibold text-cream shadow-ticket hover:bg-navy-2 focus-ring"
            >
              Register as a professional
            </Link>
            <Link
              to="/login"
              className="text-sm font-semibold text-navy underline decoration-brass underline-offset-4"
            >
              Already registered? Log in
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
