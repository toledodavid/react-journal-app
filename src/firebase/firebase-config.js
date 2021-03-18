import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBn2qrVlKCumoEPA-DLdzCgu759l0SEeCc",
  authDomain: "react-app-courses-6e136.firebaseapp.com",
  projectId: "react-app-courses-6e136",
  storageBucket: "react-app-courses-6e136.appspot.com",
  messagingSenderId: "332851451441",
  appId: "1:332851451441:web:297db2c628ba9e2305a710"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
  db,
  googleAuthProvider,
  firebase
};