"use client";

import { deleteNote } from "../services/notesService";
import { useState } from "react";
import NoteEditor from "./NoteEditor";
import { formatDate } from "../utils/formatDate";

export default function NoteCard({ note, uid }: any) {
  const [editing, setEditing] = useState(false);

  return (
    <div>
      <h3>{note.title}</h3>
      {note.updatedAt && <small>Last updated: {formatDate(note.updatedAt)}</small>}
      <div>
        <button onClick={() => setEditing((v) => !v)}>
          {editing ? "Close" : "Edit"}
        </button>
        <button onClick={() => deleteNote(uid, note.id)}>Delete</button>
      </div>
      {editing && <NoteEditor note={note} uid={uid} />}
    </div>
  );
}
