<!-- Component that's displayed on the root route. Renders the user page. -->
<template>
    <div id="user-page">
        <h1>Hello {{displayName}}.</h1>
        <h2>What are we doing today?</h2>
        <div id="tl-list">
            <a v-for="i in items"
                 v-bind:key="i.id"
                 class="list-item">
                {{i.name}}
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import {Prop} from "vue/types/options";
import {TodoList} from "../js/Models"

export default Vue.extend({
    props: {
        "displayName": String,
        "items": Array as Prop<TodoList[]>
    }
})
</script>
