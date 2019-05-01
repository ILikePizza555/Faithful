import {firebase, fsDb} from "./FirebaseInit";
import {Color, fromHex} from "./Color";

type Timestamp = firebase.firestore.Timestamp;
type DocumentSnapshot = firebase.firestore.DocumentSnapshot;
type CollectionRef = firebase.firestore.CollectionReference;

export enum Collection {
    LISTS = "lists",
    USERINFO = "user_info"
}

const collectionRefs: {[name: string]: CollectionRef} = {}

/**
 * Helper function that gets a CollectionReference from a Collections.
 * CollectionReferences obtained through this function are cached to avoid spawning several objects.
 * 
 * @param col The Collection to get a reference to.
 */
export function getCollectionRef(col: Collection): CollectionRef {
    if(!(col in collectionRefs)) {
        collectionRefs[col] = fsDb.collection(col);
    }
    return collectionRefs[col];
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
 * An entry in "items" as defined in Firestore
 */
interface ItemSchema {
    id: number;
    title: string;
    background: {
        color: string;
    };
}

/**
 * Wrapper around a DocumentSnapshot that makes accessing fields easier.
 */
export class TodoList {
    /**
     * Queries the database for all documents containing an "owner" field that matches the uid,
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

    /**
     * Queries the database for a single document matching the given id.
     * @param collectionRef 
     * @param id 
     */
    public static getById(collectionRef: CollectionRef, id: string): Promise<TodoList> {
        return collectionRef
            .doc(id)
            .get()
            .then(q => new TodoList(q));
    }

    public constructor(private _document: DocumentSnapshot) {
    }

    public get id(): string {return this._document.id}
    public get name(): string {return this._document.get("name")}
    public get ownerUid(): string {return this._document.get("owner")}
    public get dateCreated(): Timestamp {return this._document.get("created_date")}

    public get items(): Item[] {
        //TODO: Cache results instead of generating them every time
        return this._document
            .get("items")
            .map((i: ItemSchema): Item => {
                const colorObj = fromHex(i.background.color);
                return {...i, background: {color: colorObj}};
            });
    }

    //TODO: Implement setters
    //TODO: Figure out if model should automatically update with onSnapshot
}