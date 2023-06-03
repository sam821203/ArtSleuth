// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getStorage } from '@firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpwPmz9UWQ4lIzoCIdtNEVfSGEp5NNJ1o",
  authDomain: "artsleuth-requests-4684a.firebaseapp.com",
  databaseURL: "https://artsleuth-requests-4684a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "artsleuth-requests-4684a",
  storageBucket: "artsleuth-requests-4684a.appspot.com",
  messagingSenderId: "646936165221",
  appId: "1:646936165221:web:dc43ab577daa961a3d3f8c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
// console.log("firebase.js:", storage);

export default storage;
