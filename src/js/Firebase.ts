/**
 * Script that imports and initializes the Firebase library
 */
import * as firebase from "firebase/app";
import firebaseConfig from "../FirebaseConfig";

import "firebase/auth";
import "firebase/firestore";

export {firebase}

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