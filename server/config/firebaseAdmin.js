import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
// Private key is stored in .env with literal \n escapes — convert them back to newlines.
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

export const firebaseAdminReady = Boolean(projectId && clientEmail && privateKey);

let app;

if (firebaseAdminReady) {
  app = getApps().length
    ? getApps()[0]
    : initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
} else {
  console.warn(
    "Firebase Admin is not configured — protected routes will reject all requests. " +
      "Add FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY to server/.env"
  );
}

// Call this to get an Auth instance — only valid once firebaseAdminReady is true.
export function getAdminAuth() {
  return getAuth(app);
}
