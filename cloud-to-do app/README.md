# Cloud To-Do App

A React-based cloud to-do application with Firebase Authentication, Firestore real-time data sync, and Firebase Hosting support.

## Features

- Email/password sign up and login
- Create, edit, complete, and delete tasks
- Tasks stored in Firestore under each user
- Real-time sync across devices
- Firebase Hosting deployment-ready

## Setup

1. Copy `.env.example` to `.env`.
2. Create a Firebase project at https://console.firebase.google.com.
3. Enable Email/Password Authentication in Firebase Authentication.
4. Enable Firestore in production mode.
5. Paste your Firebase config values into `.env`.

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Firebase Hosting

1. Install Firebase CLI if needed:

```bash
npm install -g firebase-tools
```

2. Log in and select your project:

```bash
firebase login
firebase use --add
```

3. Deploy:

```bash
firebase deploy --only hosting
```

## Notes

- The app uses Firestore `users/{uid}/tasks` to keep each user's tasks private.
- Real-time updates use Firestore `onSnapshot` to sync immediately across devices.
- Replace `your-firebase-project-id` in `.firebaserc` with your actual project ID.  
