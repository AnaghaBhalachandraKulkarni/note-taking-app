# Note-Taking App

A production-ready cloud-based note-taking application built with Next.js (App Router, TypeScript) and Firebase (Auth + Firestore).

## Features
- Email/password Authentication
- Real-time Firestore notes (CRUD)
- Scalable, modular architecture

## Setup
1. Create a Firebase project (console) and enable:
   - Authentication → Sign-in method → **Email/Password**
   - Firestore Database
2. Copy `.env.example` to `.env` and fill in your Firebase web app config values.
3. Install dependencies: `npm install`
4. Run the app: `npm run dev` (opens on `http://localhost:3000`)

### Firestore rules
Deploy these rules to your Firebase project (or use them in the emulator): `firestore.rules`.

### (Optional) Run fully local with Firebase Emulators
If you prefer Auth + Firestore to run locally (no cloud calls):
1. Set `NEXT_PUBLIC_USE_FIREBASE_EMULATORS=true` in `.env`.
2. In one terminal: `npm run emulators` (starts Emulator UI on `http://localhost:4000`)
3. In another terminal: `npm run dev`

In emulator mode the app uses a simple dev sign-in (anonymous auth) so you can still access notes locally.

## Folder Structure
See project for details.
