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
import CardList from "./CardList.vue";

export default Vue.extend({
    components: {
        "card-list": CardList
    }
});
</script>
