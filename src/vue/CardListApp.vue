<template>
    <div id="app-card-list" 
         class="full-page-container"
         :style="currentStyle">
        <div class="center">
            <card-list
                v-on:item-update="itemUpdateHandler($event)"
                :items="items"></card-list>
        </div>
    </div>
</template>

<style lang="scss">
@import "../sass/common";

#app-card-list {
     transition: background-color 1s ease 0.3s, 
                 color 1s ease 0.3s;
}
</style>

<script lang="ts">
import Vue from 'vue'
import {Prop} from "vue/types/options";
import {Background, Item, TodoList} from "../js/Models";
import CardList from "./CardList.vue";

type DataType = {
    items: Item[];
    currentIndex: number;
}

export default Vue.extend({
    data: function(): DataType {
        return {
            items: this.tlModel.items,
            currentIndex: 0
        }
    },
    props: {
        id: String as Prop<String>,
        tlModel: TodoList as Prop<TodoList>
    },
    computed: {
        currentStyle: function(): object {
            const i: Item = this.items[this.currentIndex];

            return {
                "backgroundColor": i.background.color.hex6,
                "color": i.background.color.luminance > (150 / 255) ? "#403a2e" : "#fff9f4"
            }
        }
    },
    methods: {
        itemUpdateHandler: function(itemIndex: number) {
            this.currentIndex = itemIndex;
        }
    },
    components: {
        "card-list": CardList
    }
});
</script>
