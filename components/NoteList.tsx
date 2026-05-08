"use client";

import { createNote } from "@/services/notesService";
import { useNotes } from "@/hooks/useNotes";
import NoteCard from "./NoteCard";

export default function NoteList({ uid }: any) {
  const notes = useNotes(uid);

  return (
    <div>
      <button onClick={() => createNote(uid)}>+ New Note</button>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} uid={uid} />
      ))}
    </div>
  );
}