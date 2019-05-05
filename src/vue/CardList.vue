<template>
    <main v-on:click="mainClickHander" class="card-list">
        <card v-for="(item, index) in items"
              :value="items[index]"
              :editing="editing"
              :key="item.id"
              ref="cardList">
        </card>
    </main>
</template>

<script lang="ts">
import Vue from "vue";
import {Prop} from "vue/types/options";
import EditCard from "./EditableCard.vue";
import {Item} from "../js/Models";
import "vue-scrollto";

export const UpdateActiveItemEvent = "update-activeitem";

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
        items: Array as Prop<Item[]>,
        editing: {
            type: Boolean,
            default: false
        }
    },
    components: {
        "card": EditCard,
    },
    methods: {
        move(itemNumber?: number) {
            const i: number = typeof(itemNumber) === "number" ? itemNumber : this.activeItem + 1;

            this.activeItem = i;
            setTimeout(() => this.$scrollTo(this.$refs.cardList[i].$el as HTMLElement), 300);

            this.$emit(UpdateActiveItemEvent, i);
        },
        mainClickHander() {
            if(!this.editing) {
                this.move();
            }
        }
    }
});
</script>
