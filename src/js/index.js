import Vue from "vue";
import {fromHex} from "./Color";
import CardListApp from "../vue/CardListApp.vue";

const data = {
    "init": {
        background: { color: fromHex("#fff") }
    },
    "items": [
        {
            id: 0,
            title: "🚿 Take a shower",
            background: { color: fromHex("#f0f8ff") }
        },
        {
            id: 1,
            title: "💊 Take medications",
            background: { color: fromHex("#fff6f0") }
        },
        {
            id: 2,
            title: "👗 Wear something pretty~",
            background: {color: fromHex("#ff4f4f") }
        }
    ]
};

const vm = new Vue({
    el: "#mount-point",
    data: data,
    components: {
        "card-list-app": CardListApp
    },
    template: `<card-list-app 
        :initialBackground='init.background'
        :items='items'>
    </card-list-app>`
});