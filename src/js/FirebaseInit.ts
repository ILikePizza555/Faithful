/**
 * Script that imports and initializes the Firebase library
 */
import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

export default {firebase}

const firebaseConfig = {
    apiKey: "AIzaSyDDCVGzxZb1cM-Be3sRtbGFdhRP2-AHMUE",
    authDomain: "faithful.firebaseapp.com",
    databaseURL: "https://faithful.firebaseio.com",
    projectId: "faithful",
    storageBucket: "faithful.appspot.com",
    messagingSenderId: "32800656929"
};
firebase.initializeApp(firebaseConfig);

export const fsDb = firebase.firestore();