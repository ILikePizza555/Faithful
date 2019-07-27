export interface RoutineItem {
    readonly id: number;
    title: string;
    desc?: string;
    backgroundColor: string;
}

/**
 * Represents the addition of a new RoutineItem to a RoutineDocument.
 */
export interface AddModification {
    readonly routineId: string;
    readonly itemId: -1;
    readonly type: "add";
    change: RoutineItem;
}

/**
 * Represents the removal of a RoutineItem from a RoutineDocument.
 */
export interface RemoveModification {
    readonly routineId: string;
    readonly itemId: number;
    readonly type: "remove";
}

/** Represents an edit to a RoutineItem */
export interface ChangeModifications {
    readonly routineId: string;
    readonly itemId: number;
    readonly type: "change";
    change: {
        title?: string;
        desc?: string;
        background?: any;
    }
}

export type Modification = AddModification | RemoveModification | ChangeModifications;
export default RoutineItem;