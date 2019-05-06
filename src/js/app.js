/* eslint-env browser */
import {createAuthStateObservable, createSnapshotObservable, collections} from "./Firebase";

import Vue from "vue";
import {createRouter} from "./Routes";
import {store} from "./VuexStore";

import {mergeMap, takeUntil, filter, zip, first} from "rxjs/operators";

const vm = new Vue({
    router: createRouter(),
    store,
    template: "<router-view></router-view>"
});

const authStateObservable = createAuthStateObservable();

// Each time the auth state changes, we need to update the snapshot listener.
// This is easily done with flatMap, but a takeUntil needs to be attached so that
// memory isn't leaked.
const snapshotObservable = authStateObservable.pipe(
    mergeMap(user => 
        createSnapshotObservable(collections.lists.where("owner", "==", user.uid)))
        .pipe(
            takeUntil(authStateObservable.pipe(filter(u => u === null)))
        )
)

const initObservable = zip(authStateObservable, snapshotObservable).pipe(first());

authStateObservable.subscribe({
    next: function(user) {
        store.commit("userUpdate", user);
    },
    error: function(err) {
        console.error("[authStateObservable]" + err);
    }
});

snapshotObservable.subscribe({
    next: function(q) {
        //Do nothing on local snapshots
        if(q.metadata.hasPendingWrites) {return;}

        //Commit changes to the store.
        q.docChanges.forEach(docChange => {
            store.commit("listServerDocChange", docChange);
        });
    },
    error: function(err) {
        console.error("[snapshotObservable]" + err);
    }
});

// Once each callback has fired once, mount Vue.
initObservable.subscribe(v => vm.$mount("#mount-point"));