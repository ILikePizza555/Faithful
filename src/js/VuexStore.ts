import Vue from "vue";
import Vuex from "vuex";
import { TodoList } from "./Models";

Vue.use(Vuex);

interface StoreState {
    userInfo: firebase.User | null;
    userTdLists: TodoList[];
}

export const store = new Vuex.Store<StoreState>({
    state: {
        userInfo: null,
        userTdLists: []
    },
    getters: {
        displayName: state => {
            if(state.userInfo) { 
                return state.userInfo.displayName
            }
            return null;
        },
        getTdListById: state => (id: string) => {
            return state.userTdLists.filter(v => v.id == id)[0];
        }
    },
    mutations: {
        initState(state, init) {
            state.userInfo = init.userInfo;
            state.userTdLists = init.userTdLists;
        },
        userUpdate(state, user) {
            state.userInfo = user;
        }
    }
});