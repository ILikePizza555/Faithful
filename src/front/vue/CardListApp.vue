<template>
    <div id="app-card-list" class="full-width-container">
        <div class="center">
            <card-list :items="items"></card-list>
        </div>
</template>

<style lang="scss">
@import "../sass/common";

#app-card-list {
     transition: background-color 1s ease 0.3s, 
                 color 1s ease 0.3s;
}
</style>

<script>
import CardList from "./CardList.vue";

export default {
    components: {
        "card-list": CardList
    }
}
</script>
