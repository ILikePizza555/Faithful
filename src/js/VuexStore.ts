import Vue from "vue";
import Vuex from "vuex";
import {TodoListDocument} from "./Models";

Vue.use(Vuex);

interface StoreState {
    userInfo: firebase.User | null;
    userTdLists: {[id: string]: TodoListDocument};
}

export const store = new Vuex.Store<StoreState>({
    state: {
        userInfo: null,
        userTdLists: {}
    },
    getters: {
        displayName: state => {
            if(state.userInfo) { 
                return state.userInfo.displayName
            }
            return null;
        }
    },
    mutations: {
        initState(state, init) {
            state.userInfo = init.userInfo;
            state.userTdLists = init.userTdLists;
        },
        updateUser(state, user) {
            state.userInfo = user;
        },
        syncDocChanges(state, docChange: firebase.firestore.DocumentChange) {
            const docId = docChange.doc.id;
            
            //Have to follow Vue's reactivity rules. Meaning we can't add new fields normally.
            if(docChange.type == "added" || docChange.type == "modified") {
                Vue.set(state.userTdLists, docId, new TodoListDocument(docChange.doc));
            } else if(docChange.type == "removed") {
                Vue.set(state.userTdLists, docId, undefined);
            }
        }
    }
});