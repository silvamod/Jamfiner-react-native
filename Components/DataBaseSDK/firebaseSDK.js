// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABVQJTuAiLx09h6a_Q34saMrmY51Yppk4",
  authDomain: "jamfinder-db.firebaseapp.com",
  projectId: "jamfinder-db",
  storageBucket: "jamfinder-db.appspot.com",
  messagingSenderId: "444102004843",
  appId: "1:444102004843:web:8c328fefb2abcc6731212e"
};

// Initialize Firebase
let app;
if (firebase.apps.length == 0) {
 app = firebase.initializeApp(firebaseConfig);
 } else {
 app = firebase.app()
}
const auth = firebase.auth()
const db = app.firestore();

export { auth,db };