/**
 * This modules defines all the routes for tha app.
 */
import Vue from "vue";
import VueRouter, { RouterOptions } from "vue-router";

import AppIndex from "../vue/AppIndex.vue";
import AppCardList from "../vue/AppCardList.vue";
import AppUserPage from "../vue/AppUserPage.vue";
import AppEditList from "../vue/AppEditList.vue";

Vue.use(VueRouter);

export const routes = [
    {path: "/", component: AppIndex},
    {path: "/user", name: "userPage", component: AppUserPage},
    {path: "/list/:id", name: "list", component: AppCardList, props: true},
    {path: "/list/edit/:id", name: "editList", component: AppEditList, props:true},
    {path: "*", redirect: "userPage"}
];

/**
 * Returns a new VueRouter with the provided options and routes as defined in `routes`.
 * @param options 
 */
export function createRouter(options?: RouterOptions): VueRouter {
    return new VueRouter({
        mode: "history",
        ...options,
        routes
    });
}