/**
 * Script that imports and initializes the Firebase library
 */
import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

import {Observable} from "rxjs";

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

/**
 * Creates an Observable from firebase.auth().onAuthStateChanged.
 */
export function createAuthStateObservable(): Observable<firebase.User | null> {
    return new Observable(subscriber => firebase.auth().onAuthStateChanged(
        subscriber.next,
        subscriber.error,
        subscriber.complete
    ));
}

export type FTimestamp = firebase.firestore.Timestamp;
export type FCollectionRef = firebase.firestore.CollectionReference;
export type FDocumentRef = firebase.firestore.DocumentReference;
export type FDocumentSnap = firebase.firestore.DocumentSnapshot;

export const firestore = firebase.firestore();
export const collections = {
    lists: firestore.collection("lists"),
    userInfo: firestore.collection("user_info")
}

interface OnSnapshot<T> {
    onSnapshot(observer: {
        complete?: () => void; 
        error?: (err: firebase.firestore.FirestoreError) => void;
        next?: (snapshot: T) => void;
    }): () => void;
    onSnapshot(
        onNext?: (snapshot: T) => void, 
        onError?: (err: firebase.firestore.FirestoreError) => void,
        onCompletetion?: () => void): () => void;
}

/**
 * Creates an Observable by calling onSnapshot on the providec object.
 * @param obj 
 */
export function createSnapshotObservable<T>(obj: OnSnapshot<T>): Observable<T> {
    return new Observable(obj.onSnapshot);
}