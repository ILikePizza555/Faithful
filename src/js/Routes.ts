/**
 * This modules defines all the routes for tha app.
 */
import Vue from "vue";
import VueRouter, { RouterOptions } from "vue-router";

import CardListApp from "../vue/CardListApp.vue";
import UserPageApp from "../vue/UserPageApp.vue";

Vue.use(VueRouter);

export const routes = [
    {path: "/", component: UserPageApp, params: true},
    {path: "/list/:id", name: "list", component: CardListApp}
];

/**
 * Returns a new VueRouter with the provided options and routes as defined in `routes`.
 * @param options 
 */
export function createRouter(options: RouterOptions): VueRouter {
    return new VueRouter({
        ...options,
        routes
    });
}