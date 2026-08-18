import { getAdminAuth, firebaseAdminReady } from "../config/firebaseAdmin.js";

export async function requireAuth(req, res, next) {
  if (!firebaseAdminReady) {
    return res.status(500).json({
      message: "Server auth is not configured. Set the FIREBASE_* variables in server/.env.",
    });
  }

  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Missing bearer token." });
  }

  try {
    const decoded = await getAdminAuth().verifyIdToken(token);
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name,
    };
    next();
  } catch (err) {
    console.error("verifyIdToken failed:", err.code || err.message);
    return res.status(401).json({ message: "Invalid or expired token.", debug: err.message });
  }
}

// Like requireAuth, but never rejects — attaches req.user only if a valid
// token is present. Used by routes that work for both guests and logged-in
// users, such as the chat assistant.
export async function optionalAuth(req, res, next) {
  if (!firebaseAdminReady) return next();

  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return next();

  try {
    const decoded = await getAdminAuth().verifyIdToken(token);
    req.user = { uid: decoded.uid, email: decoded.email, name: decoded.name };
  } catch {
    // Invalid/expired token on an optional route — just proceed as a guest.
  }
  next();
}
