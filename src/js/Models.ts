import {FTimestamp, FDocumentSnap} from "./Firebase";

export interface TDItem {
    readonly id: number;
    title: string;
    desc?: string;
    background: {
        color: string;
    };
}

export class TodoListDocument {
    private readonly _tag = "model_tdlist";

    public readonly id: string;
    public readonly ownerUID: string;
    public readonly dateCreated: FTimestamp;

    public name: string;
    public items: TDItem[];

    public constructor(private _document: FDocumentSnap) {
        this.id = _document.id;
        this.ownerUID = this._document.get("owner");
        this.dateCreated = this._document.get("created_date");
        this.name = this._document.get("name");
        this.items = this._document.get("items");
    }
}