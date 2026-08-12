export function friendlyError(code) {
  const map = {
    "auth/invalid-email": "That email address doesn't look right.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Incorrect password. Try again.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/email-already-in-use": "An account with that email already exists.",
    "auth/weak-password": "Use a password with at least 6 characters.",
    "auth/popup-closed-by-user": "Sign-in was cancelled.",
    "auth/network-request-failed": "Network error. Check your connection and try again.",
  };
  return map[code] || "Something went wrong. Please try again.";
}
