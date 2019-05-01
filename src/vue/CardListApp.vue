<template>
    <div id="app-card-list" 
         class="full-page-container"
         :style="{backgroundColor: background.color.hex6, color: fontColor}">
        <div class="center">
            <card-list
                v-on:item-update="itemUpdateHandler($event)"
                :items="todoListModel.items"></card-list>
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
import {Vue, Component, Prop } from "vue-property-decorator";

import {Background, TodoList} from "../js/Models";
import CardList from "./CardList.vue";

@Component({
    components: {
        "card-list": CardList
    }
})
export default class CardListApp extends Vue {
    @Prop({type: TodoList, required: true}) todoListModel!: TodoList;

    background: Background = this.todoListModel.items[0].background;

    public itemUpdateHandler(itemIndex: number) {
        this.background = this.todoListModel.items[itemIndex].background;
    }

    get fontColor(): string {
        const bgObj: Background = this.background as Background;

        if(bgObj.color.luminance > (150 / 255)) {
            return "#000000";
        }
        return "#FFFFFF";
    }
}
</script>
