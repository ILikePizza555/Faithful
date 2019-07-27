import Vue from "vue";
import {firestore} from "firebase";
import RoutineDocument from "../models/Routine";
import {Modification as RoutineItemModification} from "../models/RoutineItems";
import { Module } from "vuex";
import { collections } from "../../script/Firebase";

export namespace Mutations {
    export const recieveServerChange = "recieveServerChange";
    export const updateTodoItem = "updateTodoItem";
}
interface FSRoutinesState {
    userTodoLists: {[id: string]: RoutineDocument};
}

export const FSRoutines: Module<FSRoutinesState, any> = {
    state: {
        userTodoLists: {}
    },
    getters: {
        allListIds(state) {
            return Object.getOwnPropertyNames(state.userTodoLists).filter(v => v != "__ob__");
        },
        allLists(state) {
            return Object.getOwnPropertyNames(state.userTodoLists)
                .filter(v => v != "__ob__")
                .map(v => state.userTodoLists[v])
        },
        listById(state) { 
            return (id: string) => state.userTodoLists[id];
        }
    },
    mutations: {
        [Mutations.recieveServerChange](state: FSRoutinesState, docChange: firestore.DocumentChange) {
            const docId = docChange.doc.id;
            
            //Have to follow Vue's reactivity rules. Meaning we can't add new fields normally.
            if(docChange.type == "added" || docChange.type == "modified") {
                Vue.set(state.userTodoLists, docId, new RoutineDocument(docChange.doc));
            } else if(docChange.type == "removed") {
                Vue.delete(state.userTodoLists, docId);
            }
        },
        [Mutations.updateTodoItem](state: FSRoutinesState, itemChange: RoutineItemModification) {
            const tdList = state.userTodoLists[itemChange.routineId];
            if(!tdList) { throw new Error("[mutation:updateTodoItem] Invalid list id: " + itemChange.routineId); }

            if(itemChange.type == "add") {
                tdList.items.push(itemChange.change);
            } else if(itemChange.type == "remove") {
                tdList.items = tdList.items.filter((_, i) => i != itemChange.itemId);
            } else if(itemChange.type == "change") {
                tdList.items[itemChange.itemId] = {
                    ...tdList.items[itemChange.itemId],
                    ...itemChange.change
                }
            } else {
                // This shouldn't happen, but just in case.
                throw new Error("[mutation:updateTodoItem] Invalid modification type: " + (itemChange as any).type);
            }
        }
    },
    actions: {
        saveList(context, id: string) {
            const list: RoutineDocument = context.getters.listById(id);
            return list.updateDocument(collections.routines);
        }
    }
}
export default FSRoutines;