import {firebase, firestore, Timestamp, DocumentSnap, CollectionRef, DocumentRef} from "./Firebase";
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
 * Base class for models of Firebase Documents.
 * 
 * The purpose of this class is to make it easier to deal with document changes by automatically
 * setting up the appropriate listeners.
 * 
 * Child classes should have property accessesors through the use of getters.
 */
export abstract class BaseDocument {
    protected abstract readonly _tag: string;
    protected readonly _docRef: DocumentRef;
    protected readonly _unsubscribe: () => void;
    protected _docSnap!: DocumentSnap;

    protected constructor(docRef: DocumentRef) {
        this._docRef = docRef;

        //Setup snapshot listeners
        this._unsubscribe = this._docRef.onSnapshot(
            this._snapshotCallback,
            this._snapshotErrorCallback
        );

        this._docRef.get().then(this._snapshotCallback);
    }

    /**
     * Callback passed to DocumentReference:onSnapshot. The main purpose
     * of this method is to delegate to onLocalSnapshot and onServerSnapshot.
     * @param doc 
     */
    protected _snapshotCallback(doc: DocumentSnap): void {
        doc.metadata.hasPendingWrites ? 
            this._onLocalSnapshot(doc) : 
            this._onServerSnapshot(doc);
    }

    /** 
     * Callback which is invoked when a document was changed locally,
     * but not yet written to the server.
     */
    protected _onLocalSnapshot(doc: DocumentSnap): void {}

    /**
     * Callback invoked when a document was changed on the server.
     * @param doc 
     */
    protected _onServerSnapshot(doc: DocumentSnap): void {
        this._docSnap = doc;
    }

    protected _snapshotErrorCallback(err: Error): void {
        console.error("[BaseDocument:" + this._tag +"]" + err);
    }
}


/**
 * Wrapper around a DocumentSnapshot that makes accessing fields easier.
 */
export class TodoListDocument {
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

    private readonly _tag = "model_tdlist";
    private readonly _docRef;

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