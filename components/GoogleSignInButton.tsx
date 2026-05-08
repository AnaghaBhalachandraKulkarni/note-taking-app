"use client";

import { loginWithGoogle } from "@/services/authService";

export default function GoogleSignInButton() {
  return <button onClick={loginWithGoogle}>Sign in with Google</button>;
}