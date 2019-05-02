/* eslint-env browser */
import {firebase} from "./Firebase";

import Vue from "vue";
import {createRouter} from "./Routes";
import {store} from "./VuexStore";

import {TodoList, Collection, getCollectionRef} from "./Models";

const vm = new Vue({
    router: createRouter(),
    el: "#mount-point",
    store,
    template: "<router-view></router-view>"
});

firebase.auth().onAuthStateChanged(function authStateHandler(user) {
    if(user) {
        // User is logged in. 
        store.commit("userUpdate", user)

        // Get user's lists from database
        TodoList.getByOwner(getCollectionRef(Collection.LISTS), user.uid)
            .then(tls => {vmData.lists = tls})
            .catch(err => {console.error("An error occured while accessing database: " + err)})
    }
})