<template>
    <div id="app-card-list" 
         class="full-page-container"
         :style="currentStyle">
        <div class="center">
            <card-list
                v-on:item-update="itemUpdateHandler($event)"
                :items="activeModel.items"></card-list>
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
import {Background, Item, TodoListDocument} from "../js/Models";
import CardList from "./CardList.vue";

type DataType = {
    currentIndex: number;
    activeModel: TodoListDocument;
}

export default Vue.extend({
    data: function(): DataType {
        return {
            currentIndex: 0,
            activeModel: this.$store.state.userTdLists[this.id]
        }
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    computed: {
        currentStyle: function(): object {
            const i: Item = this.activeModel.items[this.currentIndex];

            return {
                "backgroundColor": i.background.color.hex6,
                "color": i.background.color.luminance > (150 / 255) ? "#212121" : "#ffffff"
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
