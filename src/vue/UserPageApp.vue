<!-- Component that's displayed on the root route. Renders the user page. -->
<template>
    <div id="user-page" class="center">
        <h1>Hello {{$store.getters.displayName}}.</h1>
        <h2>What are we doing today?</h2>
        <div id="tl-list">
            <router-link v-for="i in $store.getters.getUserTodoLists"
                 v-bind:key="i.id"
                 :to="{name: 'list', params: {id: i.id}}"
                 class="list-item">
                <div class="list-item">{{i.name}}</div>
            </router-link>
        </div>
    </div>
</template>

<style lang="scss">
@import "../sass/common.scss";

#tl-list {
    display: flex;
    
}
</style>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
})
</script>
