// config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "sale-pisang-malang.firebaseapp.com",
    projectId: "sale-pisang-malang",
    storageBucket: "sale-pisang-malang.appspot.com",
    messagingSenderId: "922758528966",
    appId: "1:922758528966:web:6d188e3ebbd1d2c424bcc7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
