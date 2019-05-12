<template>
    <div id="app-card-list" 
         class="full-page-container"
         :style="currentStyle">
        <app-bar 
            :title="activeModel.name"
            :modelId="id"></app-bar>
        <card-list
            v-on:update-activeitem="itemUpdateHandler($event)"
            v-on:update-viewingitem="itemUpdateHandler($event)"
            :model="activeModel"></card-list>
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
import {TodoListDocument, TodoListItem} from "../store/Models";
import CardList, {UpdateActiveItemEvent} from "./CardList.vue";
import TheAppBar from "./TheAppBar.vue";
import {fromHex} from "../js/Color";

/**
 * The type of of an instance of this Vue component.
 * Used for `this`-typing in methods and computed properties
 */
interface AppCardList extends Vue {
    currentIndex: number;
    id: string;
    currentStyle: {[name: string]: string | number};
    activeModel: TodoListDocument;
}

export default Vue.extend({
    data: function() {
        return {
            currentIndex: 0,
        }
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    computed: {
        // NOTE: The `this` parameter is used by Typescript for type-checking. It is removed on compilation.
        currentStyle: function(this: AppCardList): object {
            const i: TodoListItem.TodoListItem = this.activeModel.items[this.currentIndex];
            const color = fromHex(i.background.color);

            return {
                "backgroundColor": i.background.color,
                "color": color.luminance > (150 / 255) ? "#212121" : "#ffffff"
            }
        },
        activeModel(this: AppCardList) {
            return this.$store.getters.listById(this.id)
        }
    },
    methods: {
        itemUpdateHandler: function(itemIndex: number) {
            this.currentIndex = itemIndex;
        }
    },
    components: {
        "card-list": CardList,
        "app-bar": TheAppBar
    }
});
</script>
