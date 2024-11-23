// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // Your Firebase configuration here
  apiKey: "AIzaSyAn2G-N-_cgp38vskF3Z-5wtFrpxVCyVgA",
  authDomain: "destinationguide-f2c36.firebaseapp.com",
  projectId: "destinationguide-f2c36",
  storageBucket: "destinationguide-f2c36.appspot.com",
  messagingSenderId: "379451376414",
  appId: "1:379451376414:web:fdcb276c962f4972b1bf0f",
  measurementId: "G-XP4ETG5T2T",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {auth, firestore, storage};