import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5CoVIdBtZl817VgrSLTT7XduD1fpxQyU",
  authDomain: "music-platform-91630.firebaseapp.com",
  projectId: "music-platform-91630",
  storageBucket: "music-platform-91630.appspot.com",
  // messagingSenderId: "908969166718",
  appId: "1:908969166718:web:12280f409e801ba6bb952f",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const usersCollection = db.collection("users");

export { auth, db, usersCollection };
