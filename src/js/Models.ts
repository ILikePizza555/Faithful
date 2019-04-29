import * as firebase from "firebase/app";
import {Color} from "./Color";

type Timestamp = firebase.firestore.Timestamp
type DocumentSnapshot = firebase.firestore.DocumentSnapshot
type CollectionRef = firebase.firestore.CollectionReference

export const enum Collections {
    LISTS = "lists",
    USERINFO = "user_info"
}

export interface Background {
    color: Color;
}

export interface Item {
    id: number;
    title: string;
    background: Background;
}

/**
 * Wrapper around a DocumentSnapshot that makes accessing fields easier.
 */
export class TodoList {
    /**
     * Queries the database for call documents containing an "owner" field that matches the uid,
     * and returns them as an array of TodoLists.
     * 
     * @param collectionRef A reference to a collection to query.
     * @param uid The uid to match against
     */
    public static getByOwner(collectionRef: CollectionRef, uid: string): Promise<TodoList[]> {
        return collectionRef
            .where("owner", "==", uid)
            .get()
            .then(q => q.docs.map(doc => new TodoList(doc)))
    }

    public constructor(private _document: DocumentSnapshot) {
    }

    public get id(): string {return this._document.id}
    public get name(): string {return this._document.get("name")}
    public get ownerUid(): string {return this._document.get("owner")}
    public get dateCreated(): Timestamp {return this._document.get("created_date")}

    //TODO: Implement setters
}