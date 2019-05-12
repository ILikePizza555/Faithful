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
import {isElementInViewport} from "../js/Useful";
import "vue-scrollto";

export const UpdateActiveItemEvent = "update-activeitem";


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
            "activeItem": 0,
            "rateLimit": 30,
            "rateLimitActive": false
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
        cardListScrollHandler(event: Event) {
            const thisArg = this;
            const cardList: EditableCardInterface[] = this.$refs.cardList;
            const containerEl: Element = this.$refs.container;
            const rateLimit: number = this.rateLimit;

            // Rate limit the event handler
            if(!this.rateLimitActive) {
                // Handle the event instantanously, but asynchronously. 
                setTimeout(() => {
                    cardList.forEach((v, i) => {
                        if(isElementInViewport(v.getInnerCardElement(), containerEl)) {
                            console.log("Element " + i + " is in viewport");
                        }
                    })
                }, 0);

                // Reset the timeout flag after the rateLimit has been reached
                setTimeout(() => {thisArg.rateLimitActive = false;}, rateLimit);
                this.rateLimitActive = true;
            }
        }
    }
});
</script>
