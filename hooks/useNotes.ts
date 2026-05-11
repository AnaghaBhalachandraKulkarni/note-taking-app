"use client";

import { useEffect, useState } from "react";
import { watchNotes } from "../services/notesService";

export const useNotes = (uid: string) => {
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    if (!uid) return;
    const unsub = watchNotes(uid, setNotes);
    return () => unsub();
  }, [uid]);

  return notes;
};
