import {firebase, firestore, Timestamp, DocumentSnap, CollectionRef} from "./Firebase";
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
 * Wrapper around a DocumentSnapshot that makes accessing fields easier.
 */
export class TodoListDocument {
    private readonly _tag = "model_tdlist";

    /**
     * Queries the given collection for all documents which have an `owner` field that
     * matches the given ownerUid. After which, the documents are converted into `TodoList`
     * instances and returned.
     * @param ownerUid 
     * @param collection 
     */
    public static getAllByOwner(ownerUid: string,
        collection: CollectionRef=firestore.listCollectionRef): Promise<TodoListDocument[]> {
        
        return collection.where("owner", "==", ownerUid)
            .get()
            .then(q => q.docs.map(d => new TodoListDocument(d)))
    }

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