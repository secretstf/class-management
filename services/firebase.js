require("dotenv").config();
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_API_KEY,
  authDomain: 'class-management-cf1af.firebaseapp.com',
  projectId: 'class-management-cf1af',
  storageBucket: 'class-management-cf1af.appspot.com',
  messagingSenderId: '498304279218',
  appId: '1:498304279218:web:5a55751929fcd85f3a5fab',
};

console.log(firebaseConfig);

const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);

export { firestore };
