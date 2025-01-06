// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Konfigurasi Firebase Anda
const firebaseConfig = {
    apiKey: "AIzaSyAwRRHRPSxH1C8_6mAk1hvSmiNISvtoPh8",
    authDomain: "sale-pisang-malang.firebaseapp.com",
    projectId: "sale-pisang-malang",
    storageBucket: "sale-pisang-malang.firebasestorage.app",
    messagingSenderId: "922758528966",
    appId: "1:922758528966:web:6d188e3ebbd1d2c424bcc7"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Menginisialisasi Firestore
const db = getFirestore(app);

export { db };
