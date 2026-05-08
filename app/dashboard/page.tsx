"use client";

import { useAuth } from "@/hooks/useAuth";
import NoteList from "@/components/NoteList";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <h1>Your Notes</h1>
      <NoteList uid={user.uid} />
    </div>
  );
}