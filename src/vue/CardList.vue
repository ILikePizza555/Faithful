<template>
    <div id="card-list-container">
        <div class="center">
            <main v-on:click="mainClickHander">
                <card v-for="(item, index) in model.items"
                    :model="model"
                    :index="index"
                    :editing="editing"
                    :key="item.id"
                    ref="cardList"></card>
            </main>
        </div>
    </div>
</template>

<style lang="scss">
@import "../sass/common.scss";

#card-list-container {
    height: 100%;
    overflow-y: scroll;
}
</style>


<script lang="ts">
import Vue from "vue";
import {Prop} from "vue/types/options";
import EditCard from "./EditableCard.vue";
import {TodoListItem, TodoListDocument} from "../store/Models";
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
        model: TodoListDocument as Prop<TodoListDocument>,
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
            setTimeout(() => 
                this.$scrollTo(this.$refs.cardList[i].$el as HTMLElement, 500, {container: "#card-list-container"}),
                300);

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
