// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDYTLHPUlq2XNpW8K4z8c_Nv0HCDIGV220",
  authDomain: "proyecto-js-abfc1.firebaseapp.com",
  projectId: "proyecto-js-abfc1",
  storageBucket: "proyecto-js-abfc1.firebasestorage.app",
  messagingSenderId: "746647459178",
  appId: "1:746647459178:web:ec487d11cf0142c6edc113"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);