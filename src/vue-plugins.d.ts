import Vue from "vue";
import {Store} from "vuex";

declare module "vue/types/vue" {
    interface Vue {
        $scrollTo: (el: HTMLElement, duration?: number, options?: object) => Function;
        $store: Store<any>;
    }
}