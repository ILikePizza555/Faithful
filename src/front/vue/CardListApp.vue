<template>
    <div id="app-card-list" class="full-page-container">
        <div class="center">
            <card-list :items="items"></card-list>
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
import {Background, Item} from "../js/Models";
import CardList from "./CardList.vue";

type DataType = {
    background: Background
}

export default Vue.extend({
    data: function(): DataType {
        return {
            background: this.initialBackground
        }
    },
    props: {
        items: Array as Prop<Item[]>,
        initialBackground: Object as Prop<Background>
    },
    computed: {
        fontColor: function(): string {
            const bgObj: Background = this.background;

            if(bgObj.color.luminance > (150 / 255)) {
                return "#000000";
            }
            return "#FFFFFF";
        }
    },
    components: {
        "card-list": CardList
    }
});
</script>
