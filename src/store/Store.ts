import Vue from "vue";
import Vuex from "vuex";

import mutations from "./Mutations";
import FSTodoLists from "./modules/FSTodoLists";

Vue.use(Vuex);

export const store = new Vuex.Store<any>({
    modules: {
        FSTodoLists
    },
    state: {
        userInfo: null
    },
    getters: {
        displayName: state => {
            if(state.userInfo) { 
                return state.userInfo.displayName
            }
            return null;
        }
    },
    mutations
});