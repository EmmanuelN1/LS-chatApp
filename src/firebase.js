// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBlWiOf3Qbcifxs_hcnSKFTv6ahENdML4",
  authDomain: "ls-chat-3a8a2.firebaseapp.com",
  projectId: "ls-chat-3a8a2",
  storageBucket: "ls-chat-3a8a2.appspot.com",
  messagingSenderId: "967748768058",
  appId: "1:967748768058:web:3c4c87ea5e6f8d0f26c003",
  measurementId: "G-6LKXR1V5PE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()
export const storage = getStorage()
