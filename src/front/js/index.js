import Vue from "vue";
import CardListApp from "../vue/CardListApp.vue";

const vm = new Vue({
    el: "#mount-point",
    components: {
        "card-list-app": CardListApp
    }
});