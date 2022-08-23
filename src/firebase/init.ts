import { initializeApp } from "firebase/app";
import { firebaseConfig } from './config';
import { Firestore, getFirestore } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db: Firestore = getFirestore(app)

export default db;