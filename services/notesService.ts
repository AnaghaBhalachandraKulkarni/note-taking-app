import { db } from "../lib/firebase";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

export const createNote = async (uid: string) => {
  return addDoc(collection(db, `users/${uid}/notes`), {
    title: "Untitled",
    body: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const updateNote = async (uid: string, id: string, data: any) => {
  return updateDoc(doc(db, `users/${uid}/notes/${id}`), {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

export const deleteNote = async (uid: string, id: string) => {
  return deleteDoc(doc(db, `users/${uid}/notes/${id}`));
};

export const watchNotes = (uid: string, callback: any) => {
  const q = query(
    collection(db, `users/${uid}/notes`),
    orderBy("updatedAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  });
};
