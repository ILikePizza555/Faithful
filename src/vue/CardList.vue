<template>
    <div id="card-list-container" 
         class="viewport" 
         @scroll="cardListScrollHandler" 
         ref="container">
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
@import "../sass/variables.scss";

#card-list-container {
    overflow-y: scroll;
}
</style>


<script lang="ts">
import Vue from "vue";
import {Prop} from "vue/types/options";
import EditCard, { EditableCardInterface } from "./EditableCard.vue";
import {TodoListItem, TodoListDocument} from "../store/Models";
import {isElementInViewport, rateLimit} from "../js/Useful";
import "vue-scrollto";

export const UpdateActiveItemEvent = "update-activeitem";
export const UpdateViewingItemEvent = "update-viewingitem";


// In the template we have a cardList ref, which is an array of Card
// we defines a type here that extends Vue with a $refs property so that Typescript
// can properly match the type.
type CardListComponent = Vue.VueConstructor<{
    $refs: {
        container: Element,
        cardList: EditableCardInterface[]
    }
} & Vue>;

export default (Vue as CardListComponent).extend({
    data: function () {
        return {
            // Item that's currently being completed
            "activeItem": 0,
            // Item that's currently in the viewport.
            "viewingItem": 0,
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
        },
        updateViewingItem(index: number) {
            if(index < 0) {
                throw new Error("Index out of range: " + index);
            } else if (index >= this.model.items.length) {
                throw new Error("Index out of range(max: " + this.model.items.length +"): " + index);
            }

            this.viewingItem = index;
            this.$emit(UpdateViewingItemEvent, index);
        },
        cardListScrollHandler: rateLimit(30, function(this: any, event: Event) {
            const cardList: EditableCardInterface[] = this.$refs.cardList;
            const containerEl: Element = this.$refs.container;

            cardList.forEach(function(this: any, v: EditableCardInterface) {
                if(isElementInViewport(v.getInnerCardElement(), containerEl)) { 
                    this.updateViewingItem(v.index);
                }
            }.bind(this));
        })
    }
});
</script>
