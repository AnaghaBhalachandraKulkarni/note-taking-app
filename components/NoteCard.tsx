import { deleteNote } from "@/services/notesService";

export default function NoteCard({ note, uid }: any) {
  return (
    <div>
      <h3>{note.title}</h3>
      <button onClick={() => deleteNote(uid, note.id)}>Delete</button>
    </div>
  );
}