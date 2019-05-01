/* eslint-env browser */
import {firebase} from "./FirebaseInit";

import Vue from "vue";
import {createRouter} from "./Routes";

import {TodoList, Collection, getCollectionRef} from "./Models";

const vmData = {
    userInfo: null,
    lists: []
}

const vm = new Vue({
    router: createRouter(),
    data: vmData,
    template: `<router-view 
        :userInfo="userInfo"
        :tdLists="lists">
    </router-view>`
});

firebase.auth().onAuthStateChanged(function authStateHandler(user) {
    if(user) {
        // User is logged in. 
        vmData.userInfo = user;

        // Get user's lists from database
        TodoList.getByOwner(getCollectionRef(Collection.LISTS), user.uid)
            .then(tls => {vmData.lists = tls})
            .catch(err => {console.error("An error occured while accessing database: " + err)})

        if(!vm.$el) {
            vm.$mount("#mount-point");
        }
    } else {
        vmData.userInfo = null;
    }
})