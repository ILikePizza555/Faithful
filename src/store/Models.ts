import {FTimestamp, FDocumentSnap} from "../js/Firebase";

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
    public readonly dateCreated: FTimestamp;

    public name: string;
    public items: TodoListItem.TodoListItem[];

    public constructor(private _document: FDocumentSnap) {
        this.id = _document.id;
        this.ownerUID = this._document.get("owner");
        this.dateCreated = this._document.get("created_date");
        this.name = this._document.get("name");
        this.items = this._document.get("items");
    }
}