<template>
    <main v-on:click="move" class="card-list">
        <card v-for="i in items"
              :item="i"
              :key="i.id"
              ref="cardList">
        </card>
    </main>
</template>

<script lang="ts">
import Vue from "vue";
import {Prop} from "vue/types/options";
import Card from "./Card.vue";
import {Item} from "../js/Models";
import "vue-scrollto";

// In the template we have a cardList ref, which is an array of Card
// we defines a type here that extends Vue with a $refs property so that Typescript
// can properly match the type.
type CardListComponent = Vue.VueConstructor<{
    $refs: {
        cardList: Vue[]
    }
} & Vue>;

export default (Vue as CardListComponent).extend({
    data: function () {
        return {
            "activeItem": 0
        };
    },
    props: {
        items: Array as Prop<Item[]>
    },
    components: {
        "card": Card
    },
    methods: {
        "move": function(itemNumber: number) {
            const i: number = typeof(itemNumber) === "number" ? itemNumber : this.activeItem + 1;

            this.activeItem = i;
            setTimeout(() => this.$scrollTo(this.$refs.cardList[i].$el as HTMLElement), 300);

            this.$emit("itemUpdate", i);
        }
    }
});
</script>
