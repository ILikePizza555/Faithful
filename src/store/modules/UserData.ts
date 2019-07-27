import Vue from "vue";
import {firebase, collections} from "../../script/Firebase";
import UserProfile from "../models/UserProfile";
import {Module} from "vuex";

export namespace Mutations {
    export const setCurrentUser = "setCurrentUser";
    export const setUserProfile = "setUserProfile";
}

interface UserDataState {
    currentUser: firebase.User | null,
    userProfile: UserProfile
}

export const UserData: Module<UserDataState, any> = {
    state: {
        currentUser: null,
        userProfile: UserProfile.constructEmpty()
    },
    getters: {
        displayName: state => {
            if(state.userProfile.preferredName) {
                return state.userProfile.preferredName;
            } else if (state.currentUser) {
                return state.currentUser.displayName;
            } else {
                return null;
            }
        },
        uid: state => {
            if(state.currentUser) {
                return state.currentUser.uid;
            }
            return null;
        }
    },
    actions: {
        clearUserData({commit, state}) {
            commit(Mutations.setCurrentUser, null);
            commit(Mutations.setUserProfile, UserProfile.constructEmpty());
        },
        fetchUserProfile({commit, state}) {
            if(!state.currentUser) {
                console.error("[vuex;actions;fetchUserProfile] currentUser is null!");
                return;
            }

            collections.userInfo.doc(state.currentUser.uid).get().then(res => {
                commit(Mutations.setUserProfile, res.data());
            }).catch(err => {
                console.error("[vuex;actions;fetchUserProfile] " + err);
            })
        }
    },
    mutations: {
        [Mutations.setCurrentUser]: function(state, payload) {
            //TODO: data checking
            state.currentUser = payload;
        },
        [Mutations.setUserProfile]: function(state, payload) {
            state.userProfile = payload;
        }
    }
}

export default UserData;