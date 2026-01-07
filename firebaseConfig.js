import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxDtFpjgvOrm86XR6fVIqPXH_bv88ump4",
  authDomain: "quizapp-ffca7.firebaseapp.com",
  projectId: "quizapp-ffca7",
  storageBucket: "quizapp-ffca7.firebasestorage.app",
  messagingSenderId: "639611806168",
  appId: "1:639611806168:web:f8b7394571584052df52ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app)