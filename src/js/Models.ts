import {firebase, firestore, Timestamp, DocumentSnap} from "./Firebase";
import {Color, fromHex} from "./Color";

export interface Background {
    color: Color;
}

export interface Item {
    id: number;
    title: string;
    background: Background;
}

/**
 * Item as defined in Firestore.
 */
interface FirestoreItem {
    id: number;
    title: string;
    background: {
        color: string;
    };
}
type AugmentedItem = {_background: {color: string}} & Item;
/**
 * Builds an object of type Item from Firestore data.
 * The `background` property is lazily evaluated to save on computing resources.
 * @param fsObj 
 */
function itemFromFS(fsObj: FirestoreItem): AugmentedItem {
    return {
        ...fsObj,
        _background: fsObj.background,
        get background(): Background {
            return {
                color: fromHex(this._background.color)
            }
        }
    }
}

/**
 * Interface that defines appropriate callback methods that can be
 * passed to objects which deal with `onSnapshot()`
 */
export interface SnapshotCallback<T> {
    onLocal?: (doc: T) => void;
    onServer?: (doc: T) => void;
    onError?: (err: Error) => void;
    onComplete?: () => void;
}

/**
 * Wrapper around a DocumentSnapshot that makes accessing fields easier.
 */
export class TodoListDocument {
    private readonly _tag = "model_tdlist";

    public constructor(private _document: DocumentSnap) {
    }

    public get id(): string {return this._document.id}
    public get name(): string {return this._document.get("name")}
    public get ownerUid(): string {return this._document.get("owner")}
    public get dateCreated(): Timestamp {return this._document.get("created_date")}

    public get items(): Item[] {
        return this._document
            .get("items")
            .map(itemFromFS);
    }

    public item(index: number): Item {
        const fbObj: FirestoreItem = this._document.get("items")[index];
        return itemFromFS(fbObj);
    }
}