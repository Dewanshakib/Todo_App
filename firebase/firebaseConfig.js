
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBW83QiXju6dJ0OLrcamPKj3mhoaeLAQ7U",
  authDomain: "crud-d6a91.firebaseapp.com",
  projectId: "crud-d6a91",
  storageBucket: "crud-d6a91.appspot.com",
  messagingSenderId: "294945594670",
  appId: "1:294945594670:web:175268c581f32d5e24eebf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
