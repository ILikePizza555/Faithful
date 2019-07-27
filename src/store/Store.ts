import Vue from "vue";
import Vuex from "vuex";

import FSRoutines from "./modules/FSRoutines";
import UserData from "./modules/FSRoutines";

Vue.use(Vuex);

export const store = new Vuex.Store<any>({
    modules: {
        fsRoutines: FSRoutines,
        userData: UserData
    }
});