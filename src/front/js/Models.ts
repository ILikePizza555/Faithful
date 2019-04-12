import {Color} from "./Color";

export interface Background {
    color: Color;
}

export interface Item {
    id: number;
    title: string;
    background: Background;
}