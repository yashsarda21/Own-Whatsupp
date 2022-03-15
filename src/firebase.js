// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYLdGHOs0ortPv6KCtI_6muOINVTLL5XU",
  authDomain: "whatsupp-5050c.firebaseapp.com",
  databaseURL: "https://whatsupp-5050c.firebaseio.com",
  projectId: "whatsupp-5050c",
  storageBucket: "whatsupp-5050c.appspot.com",
  messagingSenderId: "956586299726",
  appId: "1:956586299726:web:6281146636c84a0b988e1f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };
