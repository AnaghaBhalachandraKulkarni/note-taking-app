"use client";

import { useAuth } from "../../hooks/useAuth";
import NoteList from "../../components/NoteList";
import { logout } from "../../services/authService";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <h1>Your Notes</h1>
      <button onClick={logout}>Logout</button>
      <NoteList uid={user.uid} />
    </div>
  );
}
