import Vue from "vue";

declare module "vue/types/vue" {
    interface Vue {
        $scrollTo: (el: HTMLElement, duration?: number, options?: object) => Function;
    }
}