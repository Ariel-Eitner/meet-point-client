// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3nKdyTYD5lMMo5gCr-ogrGpiasz-7Xs8",
  authDomain: "meet-point-f3efb.firebaseapp.com",
  projectId: "meet-point-f3efb",
  storageBucket: "meet-point-f3efb.appspot.com",
  messagingSenderId: "51791340955",
  appId: "1:51791340955:web:b941fed67c762f9ffe6d3e",
  measurementId: "G-H5P3HX0PML",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
