// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import 'firebase/auth';
import {
  getAuth,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set persistence to AsyncStorage for React Native
const auth = getAuth(app);
setPersistence(auth, getReactNativePersistence(ReactNativeAsyncStorage))
  .then(() => {
    console.log("Firebase Auth persistence set successfully.");
  })
  .catch((error) => {
    console.error("Error setting Firebase Auth persistence:", error);
  });

  const firestore = getFirestore(app);
  const storage = getStorage(app);

export { auth, firestore, storage };