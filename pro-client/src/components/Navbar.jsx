import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth, signOut } from "../lib/firebase";

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2 focus-ring rounded">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-cream font-display text-lg">
            U
          </span>
          <span className="font-display text-xl tracking-tight text-navy">
            Urban<span className="text-brass-dark">Care</span>{" "}
            <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">Pro</span>
          </span>
        </Link>

        {user ? (
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="text-sm font-medium text-ink-soft hover:text-navy transition-colors focus-ring rounded"
            >
              Orders
            </Link>
            <Link
              to="/my-jobs"
              className="text-sm font-medium text-ink-soft hover:text-navy transition-colors focus-ring rounded"
            >
              My jobs
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-full border border-navy px-4 py-2 text-sm font-semibold text-navy hover:bg-navy hover:text-cream transition-colors focus-ring"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-ink-soft hover:text-navy focus-ring rounded">
              Log in
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream shadow-ticket hover:bg-navy-2 transition-colors focus-ring"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
