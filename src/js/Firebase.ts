/**
 * Script that imports and initializes the Firebase library
 */
import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

export {firebase}

const firebaseConfig = {
    apiKey: "AIzaSyDDCVGzxZb1cM-Be3sRtbGFdhRP2-AHMUE",
    authDomain: "faithful.firebaseapp.com",
    databaseURL: "https://faithful.firebaseio.com",
    projectId: "faithful",
    storageBucket: "faithful.appspot.com",
    messagingSenderId: "32800656929"
};
firebase.initializeApp(firebaseConfig);

export type Timestamp = firebase.firestore.Timestamp;
export type CollectionRef = firebase.firestore.CollectionReference;
export type DocumentRef = firebase.firestore.DocumentReference;
export type DocumentSnap = firebase.firestore.DocumentSnapshot;

interface AugFirestore extends firebase.firestore.Firestore {
    listCollectionRef: firebase.firestore.CollectionReference;
    userinfoCollectionRef: firebase.firestore.CollectionReference;
}

export const firestore: AugFirestore = firebase.firestore() as AugFirestore;
firestore.listCollectionRef = firestore.collection("lists");
firestore.userinfoCollectionRef = firestore.collection("user_info");