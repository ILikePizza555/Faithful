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


export type FTimestamp = firebase.firestore.Timestamp;
export type FCollectionRef = firebase.firestore.CollectionReference;
export type FDocumentRef = firebase.firestore.DocumentReference;
export type FDocumentSnap = firebase.firestore.DocumentSnapshot;
export type FQuerySnap = firebase.firestore.QuerySnapshot;

export const firestore = firebase.firestore();
export const collections = {
    lists: firestore.collection("lists"),
    userInfo: firestore.collection("user_info")
}