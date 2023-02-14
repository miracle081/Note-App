// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-fwUy9KmKs4l3vOMMOtMWvMs6LBmrYz4",
  authDomain: "note-b7625.firebaseapp.com",
  projectId: "note-b7625",
  storageBucket: "note-b7625.appspot.com",
  messagingSenderId: "955552726801",
  appId: "1:955552726801:web:e639b9fe16993654ebd6b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const authentication = getAuth(app);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
export const storage = firebase.storage;