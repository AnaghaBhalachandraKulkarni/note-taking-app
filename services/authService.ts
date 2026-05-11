import { auth, provider } from "@/lib/firebase";
import {
  signInWithPopup,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

export const loginWithGoogle = async () => {
  if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true") {
    return signInAnonymously(auth);
  }
  return signInWithPopup(auth, provider);
};

export const logout = async () => {
  return signOut(auth);
};

export const subscribeToAuth = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
