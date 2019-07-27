/* eslint-env browser */
import {firebase, collections} from "./Firebase";

import Vue from "vue";
import {createRouter} from "./Routes";
import {store} from "../store/Store";
import {Mutations as UserDataMutations} from "../store/modules/UserData";
import {Mutations as TodoListsMutations} from "../store/modules/FSRoutines";

const vm = new Vue({
    router: createRouter(firebase.auth()),
    store,
    template: "<router-view></router-view>"
});

vm.$mount("#mount-point");

// Variables holding the unsubscribe functions for various listeners.
type OptionalMethod = (() => void) | null
let unsubDocChanges: OptionalMethod = null;

// Keeps the login state synced on page refresh
firebase.auth().onAuthStateChanged(function authStateHandler(user) {
        if(user) {
            store.commit(UserDataMutations.setCurrentUser, user);
            store.dispatch("fetchUserProfile");

            // Setup snapshot listeners
            unsubDocChanges = collections.routines.where("owner", "==", user.uid).onSnapshot({
                next: function(query) {
                    query.docChanges().forEach(
                        change => store.commit(TodoListsMutations.recieveServerChange, change)
                    );
                },
                error: function(err) {
                    console.error("[QuerySnapshotHandler] " + err);
                }
            });
        }
    },
    function authStateError(err) {
        console.error("[authStateHandler]" + err);
    }
)