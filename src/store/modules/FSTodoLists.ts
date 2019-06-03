import Vue from "vue";
import {pushServerChange, updateTodoItem} from "../Mutations";
import {firestore} from "firebase";
import {TodoListDocument, TodoListItem} from "../Models";
import { Module } from "vuex";

interface FSTodoListsState {
    userTodoLists: Map<string, TodoListDocument>;
}

export const FSTodoLists: Module<FSTodoListsState, any> = {
    state: {
        userTodoLists: new Map<string, TodoListDocument>()
    },
    getters: {
        getUserTodoLists(state): IterableIterator<TodoListDocument> {
            return state.userTodoLists.values();
        },
        listById(state) { 
            return (id: string) => state.userTodoLists.get(id);
        }
    },
    mutations: {
        [pushServerChange](state: FSTodoListsState, docChange: firestore.DocumentChange) {
            const docId = docChange.doc.id;
            
            //Have to follow Vue's reactivity rules. Meaning we can't add new fields normally.
            if(docChange.type == "added" || docChange.type == "modified") {
                state.userTodoLists.set(docId, new TodoListDocument(docChange.doc));
            } else if(docChange.type == "removed") {
                state.userTodoLists.delete(docId);
            }
        },
        [updateTodoItem](state: FSTodoListsState, itemChange: TodoListItem.Modification) {
            const tdList = state.userTodoLists.get(itemChange.todoListId);
            if(!tdList) { throw new Error("[mutation:updateTodoItem] Invalid list id: " + itemChange.todoListId); }

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

            state.userTodoLists.set(tdList.id, tdList);
        }
    }
}
export default FSTodoLists;