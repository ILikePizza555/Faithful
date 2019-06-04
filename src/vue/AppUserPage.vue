<!-- Component that's displayed on the root route. Renders the user page. -->
<template>
    <div id="user-page" class="center">
        <h1>Hello {{$store.getters.displayName}}.</h1>
        <h2>What are we doing today?</h2>
        <div id="tl-list">
            <div>
                <router-link v-for="i in $store.getters.allLists"
                    v-bind:key="i.id"
                    :to="{name: 'list', params: {id: i.id}}"
                    class="list-item">{{i.name}}</router-link>
            </div>
            <link-box class="list-item">New Item</link-box>
        </div>
    </div>
</template>

<style lang="scss">
@import "../sass/common.scss";

#tl-list {
    display: flex;
    flex-direction: column;
}
</style>

<script lang="ts">
import Vue from "vue"
import LinkBox from "./LinkBox.vue"

export default Vue.extend({
    components: {
        "link-box": LinkBox
    }
})
</script>
