/**
 * This modules defines all the routes for tha app.
 */
import Vue from "vue";
import VueRouter, { RouterOptions} from "vue-router";

import AppIndex from "../vue/AppIndex.vue";
import AppCardList from "../vue/AppCardList.vue";
import AppUserPage from "../vue/AppUserPage.vue";
import AppEditList from "../vue/AppEditList.vue";

Vue.use(VueRouter);

export const routes = [
    {
        path: "/", 
        component: AppIndex, 
        meta: {requiresAuth: false}
    },
    {
        path: "/user", 
        name: "userPage", 
        component: AppUserPage, 
        meta: {requiresAuth: true}
    },
    {
        path: "/list/:id",
        name: "list",
        component: AppCardList,
        props: true,
        meta: {requiresAuth: true}
    },
    {
        path: "/list/edit/:id",
        name: "editList",
        component: AppEditList,
        props: true,
        meta: {requiresAuth: true}
    }
];

/**
 * Returns a new VueRouter with the provided options and routes as defined in `routes`.
 * @param options 
 */
export function createRouter(firebaseAuth: firebase.auth.Auth, options?: RouterOptions): VueRouter {
    const router = new VueRouter({
        mode: "history",
        ...options,
        routes
    });

    // Prevents the user from accessing pages if not logged in.
    // Note that this doesn't ensure the user is allowed to see the page, just that the user is identified with firebase.
    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
        const userAuth = firebaseAuth.currentUser;

        if(requiresAuth && !userAuth) {
            next("/")
        } else if (requiresAuth && userAuth) {
            next()
        } else {
            next()
        }
    });

    return router;
}