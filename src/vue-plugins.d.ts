import Vue from "vue";

declare module "vue/types/vue" {
    interface Vue {
        $scrollTo: (el: HTMLElement, duration?: number, options?: object) => Function;
        $store: {
            state: any;
            getters: any;
            commit: (name: string, payload: any) => void;
        };
    }
}