import Vue from "vue";
import {pushServerChange} from "../Mutations";
import {firestore} from "firebase";
import {TodoListDocument} from "../Models";

export const FSTodoLists = {
    state: {
        userTodoLists: {}
    },
    mutations: {
        [pushServerChange](state: any, docChange: firestore.DocumentChange) {
            const docId = docChange.doc.id;
            
            //Have to follow Vue's reactivity rules. Meaning we can't add new fields normally.
            if(docChange.type == "added" || docChange.type == "modified") {
                Vue.set(state.userTodoLists, docId, new TodoListDocument(docChange.doc));
            } else if(docChange.type == "removed") {
                Vue.set(state.userTodoLists, docId, undefined);
            }
        }
    }
}
export default FSTodoLists;