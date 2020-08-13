import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/messaging";
import { globals } from "../utils/globals";
const firebaseConfig = {
  apiKey: "AIzaSyAReYW888EY-cYMPhY1GZi_PB2XfYde_tM",
  authDomain: "chat-8bee7.firebaseapp.com",
  databaseURL: "https://chat-8bee7.firebaseio.com",
  projectId: "chat-8bee7",
  storageBucket: "chat-8bee7.appspot.com",
  messagingSenderId: "834156245052",
  appId: "1:834156245052:web:34e78e2490e6a733019339",
  measurementId: "G-R95PDSE503",
};
const initApp = firebase.initializeApp(firebaseConfig);
if (firebase.messaging.isSupported()) {
  initApp.messaging().usePublicVapidKey(globals.gcmKeyPair);
}
export default firebase;
