import {RoutineItem} from "./RoutineItems";
import {firebase} from "../../script/Firebase";
import TimeStamp = firebase.firestore.Timestamp;
import CollectionRef = firebase.firestore.CollectionReference;
import DocumentSnap = firebase.firestore.DocumentSnapshot;

type ConstuctorObject = {
    id: string;
    ownerUID: string;
    dateCreated: TimeStamp;
    name: string;
    items: RoutineItem[];
}

function isDocumentSnap(object: DocumentSnap | ConstuctorObject): object is DocumentSnap {
    return (object as DocumentSnap).get !== undefined;
}

export class RoutineDocument {
    private readonly _tag = "model_tdlist";

    public readonly id: string;
    public readonly ownerUID: string;
    public readonly dateCreated: TimeStamp;

    public name: string;
    public items: RoutineItem[];

    public constructor(document: DocumentSnap | ConstuctorObject) {
        if(isDocumentSnap(document)) {
            this.id = document.id;
            this.ownerUID = document.get("owner");
            this.dateCreated = document.get("created_date");
            this.name = document.get("name");
            this.items = document.get("items");
        } else {
            this.id = document.id;
            this.ownerUID = document.ownerUID;
            this.dateCreated = document.dateCreated;
            this.name = document.name;
            this.items = document.items;
        }
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
export default RoutineDocument;