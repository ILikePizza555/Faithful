/* eslint-env browser */
import {firebase, collections} from "./Firebase";

import Vue from "vue";
import {createRouter} from "./Routes";
import {store} from "./VuexStore";

const vm = new Vue({
    router: createRouter(),
    store,
    template: "<router-view></router-view>"
});

/**
 * The initalization process.
 * 
 * First we setup a callback to run after firebase finishes getting the user authentication
 * information. Because most things are dependent on the user being authenticated, management of
 * other Firebase services, including Firestore snapshot subscriptions, is done in this callback.
 * 
 * TODO: Move this to Observables.
 */
firebase.auth().onAuthStateChanged(
    function authStateHandler(user) {
        /** Unsubscribe function for the query snapshot listener. */
        let queryUnsub = null;
        let first = true;

        store.commit("userUpdate", user);

        if(user) {
            queryUnsub = collections.lists.where("owner", "==", user.uid).onSnapshot({
                next: function(q) {
                    q.docChanges().forEach(
                        docChange => store.commit("listSeverDocChange", docChange)
                    );

                    if(first) {
                        first = false;
                        vm.$mount("#mount-point");
                    }
                },
                error: function(err) {
                    console.error("[QuerySnapshotHandler]" + err);
                }
            })
        } else if(!user && !queryUnsub) {
            // User has logged out, unsubscribe from any further snapshot events.
            queryUnsub();
        }
    },
    function authStateError(err) {
        console.error("[authStateHandler]" + err);
    }
)