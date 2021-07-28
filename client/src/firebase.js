import firebase from "firebase/app";
require("firebase/auth");


const firebaseConfig = {
  apiKey: "AIzaSyBBGKe8Ex2jxLSxh7OCMSc0NaNkpqsVrDE",
  authDomain: "ecommerce-b3848.firebaseapp.com",
  projectId: "ecommerce-b3848",
  storageBucket: "ecommerce-b3848.appspot.com",
  messagingSenderId: "683601199719",
  appId: "1:683601199719:web:2432d925fec5ca83004ac2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
