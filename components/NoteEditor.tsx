"use client";

import { useState } from "react";
import { updateNote } from "../services/notesService";

export default function NoteEditor({ note, uid }: any) {
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      <button onClick={() => updateNote(uid, note.id, { title, body })}>
        Save
      </button>
    </div>
  );
}
