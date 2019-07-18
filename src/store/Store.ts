import Vue from "vue";
import Vuex from "vuex";

import FSTodoLists from "./modules/FSTodoLists";
import UserData from "./modules/FSTodoLists";

Vue.use(Vuex);

export const store = new Vuex.Store<any>({
    modules: {
        fsLists: FSTodoLists,
        userData: UserData
    }
});