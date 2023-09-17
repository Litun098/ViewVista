// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBE-tQklbfAKZqxGlq4C95-rJuzgABoUeA",
  authDomain: "video-40a6f.firebaseapp.com",
  projectId: "video-40a6f",
  storageBucket: "video-40a6f.appspot.com",
  messagingSenderId: "153279188332",
  appId: "1:153279188332:web:33076aa1190a805a8c7749"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider()
export const auth = getAuth()

export default app