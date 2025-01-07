import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
    apiKey: "AIzaSyAwRRHRPSxH1C8_6mAk1hvSmiNISvtoPh8",
    authDomain: "sale-pisang-malang.firebaseapp.com",
    projectId: "sale-pisang-malang",
    storageBucket: "sale-pisang-malang.firebasestorage.app",
    messagingSenderId: "922758528966",
    appId: "1:922758528966:web:714f195b89eb349224bcc7"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Firebase Auth
const auth = getAuth(app);

// Inisialisasi Firestore
const db = getFirestore(app);

export { auth, db };
