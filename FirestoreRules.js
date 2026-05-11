// Deprecated: Firestore security rules live in `firestore.rules` (used by Firebase CLI).
// This file remains only as a readable reference.

export const firestoreRules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/notes/{noteId} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}`;
