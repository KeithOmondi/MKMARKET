// src/config/firebase.js
import admin from "firebase-admin";
import { ENV } from "./env.js";

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: ENV.FIREBASE.PROJECT_ID,
    clientEmail: ENV.FIREBASE.CLIENT_EMAIL,
    privateKey: ENV.FIREBASE.PRIVATE_KEY,
  }),
});

export const firebaseMessaging = admin.messaging();
