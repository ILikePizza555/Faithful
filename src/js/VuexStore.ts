import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

Vue.use(Vuex);

interface StoreState {
    userInfo: firebase.UserInfo | null;
}

export const store = new Vuex.Store<StoreState>({
    state: {
        userInfo: null
    },
    mutations: {
        userUpdate(state, user) {
            state.userInfo = user;
        }
    }
});