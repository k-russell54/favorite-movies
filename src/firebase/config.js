import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBmlQLmhILO0TAFQB8DoJJlPX6RSUmT1Ew",
    authDomain: "streamingfavorites.firebaseapp.com",
    projectId: "streamingfavorites",
    storageBucket: "streamingfavorites.firebasestorage.app",
    messagingSenderId: "865694929254",
    appId: "1:865694929254:web:81b81f15520789a43d78a7"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
