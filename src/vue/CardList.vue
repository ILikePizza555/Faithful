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
                <end-card :editing="editing"
                          :index="model.items.length"
                          @newitem-click="addItemHandler()"
                          ref="endCard"></end-card>
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
import EndCard, { TheEndCardInterface } from "./TheEndCard.vue";
import {TodoListItem, TodoListDocument} from "../store/Models";
import {isElementInViewport, rateLimit} from "../js/Useful";
import "vue-scrollto";
import { setTimeout } from "timers";
import { updateTodoItem } from "../store/Mutations";

export const UpdateActiveItemEvent = "update-activeitem";
export const UpdateViewingItemEvent = "update-viewingitem";
export const CompletedEvent = "completed";


// In the template we have a cardList ref, which is an array of Card
// we defines a type here that extends Vue with a $refs property so that Typescript
// can properly match the type.
type CardListComponent = Vue.VueConstructor<{
    $refs: {
        container: Element,
        cardList: EditableCardInterface[],
        endCard: TheEndCardInterface
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
        "end-card": EndCard
    },
    methods: {
        move(itemNumber?: number) {
            const i: number = typeof(itemNumber) === "number" ? itemNumber : this.activeItem + 1;

            if(i < this.$refs.cardList.length) {
                this.activeItem = i;
                setTimeout(() => 
                    this.$scrollTo(this.$refs.cardList[i].$el as HTMLElement, 500, {container: "#card-list-container"}),
                    300);
                this.$emit(UpdateActiveItemEvent, i);
            } else if (i == this.$refs.cardList.length) {
                this.activeItem = i;
                setTimeout(() =>
                    this.$scrollTo(this.$refs.endCard.$el as HTMLElement, 500, {container: "#card-list-container"}),
                    300);
                this.$emit(UpdateActiveItemEvent, i);
                this.$emit(CompletedEvent);
            }
        },
        mainClickHander() {
            if(!this.editing) {
                this.move();
            }
        },
        addItemHandler() {
            if(!this.editing) {
                console.warn("[CardList] addItemHandler() called when not editing! Ignored...");
                return;
            }

            this.$store.commit(updateTodoItem, {
                todoListId: this.model.id,
                itemId: -1,
                type: "add",
                change: {id: this.model.items.length, title: null, background: null}
            });
        },
        updateViewingItem(index: number) {
            if(index < 0) {
                throw new Error("Index out of range: " + index);
            } else if (index > this.model.items.length) {
                throw new Error("Index out of range(max: " + this.model.items.length +"): " + index);
            }

            this.viewingItem = index;
            this.$emit(UpdateViewingItemEvent, index);
        },
        cardListScrollHandler: rateLimit(30, function(this: any, event: Event) {
            const cardList: any[] = (this.$refs.cardList as any[]).slice();
            cardList.push(this.$refs.endCard);

            const containerEl: Element = this.$refs.container;

            cardList.forEach(function(this: any, v: any) {
                const offset = {
                    top: 30,
                    left: 0,
                    bottom: 0,
                    right: 0
                }
                if(isElementInViewport(v.getInnerCardElement(), containerEl, offset)) { 
                    this.updateViewingItem(v.index);
                }
            }.bind(this));
        })
    }
});
</script>
