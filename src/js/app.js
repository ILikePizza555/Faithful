/* eslint-env browser */
import {firebase} from "./Firebase";

import Vue from "vue";
import {createRouter} from "./Routes";
import {store} from "./VuexStore";

import {TodoList} from "./Models";

const vm = new Vue({
    router: createRouter(),
    el: "#mount-point",
    store,
    template: "<router-view></router-view>"
});

firebase.auth().onAuthStateChanged(function authStateHandler(user) {
    if(user) {
        // User is logged in. 
        // Get user's lists from database
        TodoList.getAllByOwner(user.uid)
            .then(tls => store.commit("initState", {userInfo: user, userTdLists: tls}))
            .catch(err => {console.error("An error occured while accessing database: " + err)})
    }
})