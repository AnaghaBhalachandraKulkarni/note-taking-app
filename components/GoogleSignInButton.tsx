"use client";

import { loginWithGoogle } from "@/services/authService";

export default function GoogleSignInButton() {
  const usingEmulators =
    process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true";

  return (
    <button onClick={loginWithGoogle}>
      {usingEmulators ? "Sign in (dev)" : "Sign in with Google"}
    </button>
  );
}
