import {firebase} from "../script/Firebase";
import TimeStamp = firebase.firestore.Timestamp;
import DocumentSnap = firebase.firestore.DocumentSnapshot;
import CollectionRef = firebase.firestore.CollectionReference;
import DocumentRef = firebase.firestore.DocumentReference;

export namespace TodoListItem {
    export interface TodoListItem {
        readonly id: number;
        title: string;
        desc?: string;
        background: {
            color: string;
        };
    }

    /**
     * Represents the addition of a new TodoListItem to a TodoListDocument.
     */
    export interface AddModification {
        readonly todoListId: string;
        readonly itemId: -1;
        readonly type: "add";
        change: TodoListItem;
    }

    /**
     * Represents the removal of a TodoListItem from a TodoListDocument.
     */
    export interface RemoveModification {
        readonly todoListId: string;
        readonly itemId: number;
        readonly type: "remove";
    }

    /** Represents an edit to a TodoListItem */
    export interface ChangeModifications {
        readonly todoListId: string;
        readonly itemId: number;
        readonly type: "change";
        change: {
            title?: string;
            desc?: string;
            background?: any;
        }
    }

    export type Modification = AddModification | RemoveModification | ChangeModifications;
}

export class TodoListDocument {
    private readonly _tag = "model_tdlist";

    public readonly id: string;
    public readonly ownerUID: string;
    public readonly dateCreated: TimeStamp;

    public name: string;
    public items: TodoListItem.TodoListItem[];

    public static createDocument(collection: CollectionRef, name: string, userUID: string): Promise<DocumentRef> {
        return collection.add({
            name: name,
            owner: userUID,
            created_date: TimeStamp.now(),
            items: []
        })
    }

    public constructor(private _document: DocumentSnap) {
        this.id = _document.id;
        this.ownerUID = this._document.get("owner");
        this.dateCreated = this._document.get("created_date");
        this.name = this._document.get("name");
        this.items = this._document.get("items");
    }

    /**
     * Updates the documents on Firebase.
     * 
     * Returns the same promise created by a call to DocumentReference.update()
     */
    public updateDocument(collection: CollectionRef): Promise<void> {
        return collection.doc(this.id).update({
            owner: this.ownerUID,
            created_date: this.dateCreated,
            name: this.name,
            items: this.items
        });
    }
}