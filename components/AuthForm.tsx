"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  resetPassword,
  signInWithEmail,
  signUpWithEmail,
} from "../services/authService";

type Mode = "sign_in" | "sign_up" | "reset";

export default function AuthForm() {
  const [mode, setMode] = useState<Mode>("sign_in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const title = useMemo(() => {
    if (mode === "sign_up") return "Create account";
    if (mode === "reset") return "Reset password";
    return "Sign in";
  }, [mode]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setBusy(true);
    try {
      if (mode === "sign_up") {
        await signUpWithEmail(email, password);
        setMessage("Account created. You are now signed in.");
      } else if (mode === "reset") {
        await resetPassword(email);
        setMessage("Password reset email sent (if the account exists).");
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: any) {
      setError(err?.message ?? "Authentication failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h1>{title}</h1>

      <form onSubmit={onSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              style={{ width: "100%" }}
            />
          </label>

          {mode !== "reset" && (
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete={mode === "sign_up" ? "new-password" : "current-password"}
                style={{ width: "100%" }}
              />
            </label>
          )}

          <button type="submit" disabled={busy}>
            {busy ? "Please wait..." : title}
          </button>
        </div>
      </form>

      {error && (
        <p style={{ color: "crimson", marginTop: 12 }}>
          {error}
        </p>
      )}
      {message && (
        <p style={{ color: "green", marginTop: 12 }}>
          {message}
        </p>
      )}

      <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
        {mode !== "sign_in" && (
          <button type="button" onClick={() => setMode("sign_in")} disabled={busy}>
            Sign in
          </button>
        )}
        {mode !== "sign_up" && (
          <button type="button" onClick={() => setMode("sign_up")} disabled={busy}>
            Create account
          </button>
        )}
        {mode !== "reset" && (
          <button type="button" onClick={() => setMode("reset")} disabled={busy}>
            Forgot password
          </button>
        )}
      </div>
    </div>
  );
}

