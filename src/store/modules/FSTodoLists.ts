import Vue from "vue";
import {recieveServerChange, updateTodoItem} from "../Mutations";
import {firestore} from "firebase";
import {TodoListDocument, TodoListItem} from "../Models";
import { Module } from "vuex";
import { collections } from "../../js/Firebase";

interface FSTodoListsState {
    userTodoLists: {[id: string]: TodoListDocument};
}

export const FSTodoLists: Module<FSTodoListsState, any> = {
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
        [recieveServerChange](state: FSTodoListsState, docChange: firestore.DocumentChange) {
            const docId = docChange.doc.id;
            
            //Have to follow Vue's reactivity rules. Meaning we can't add new fields normally.
            if(docChange.type == "added" || docChange.type == "modified") {
                Vue.set(state.userTodoLists, docId, new TodoListDocument(docChange.doc));
            } else if(docChange.type == "removed") {
                Vue.delete(state.userTodoLists, docId);
            }
        },
        [updateTodoItem](state: FSTodoListsState, itemChange: TodoListItem.Modification) {
            const tdList = state.userTodoLists[itemChange.todoListId];
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
        }
    },
    actions: {
        saveList(context, id: string) {
            const list: TodoListDocument = context.getters.listById(id);
            return list.updateDocument(collections.lists);
        }
    }
}
export default FSTodoLists;