// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8zKpR170CxARoQG4wbrzN8YG5ntZTaTg",
  authDomain: "ls-chatsystem.firebaseapp.com",
  projectId: "ls-chatsystem",
  storageBucket: "ls-chatsystem.appspot.com",
  messagingSenderId: "854345975132",
  appId: "1:854345975132:web:c46dddd48037c3f761ed99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()
export const storage = getStorage()