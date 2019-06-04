<!-- Component that's displayed on the root route. Renders the user page. -->
<template>
    <div id="user-page" class="center">
        <h1>Hello {{$store.getters.displayName}}.</h1>
        <h2>What are we doing today?</h2>
        <div id="tl-list">
            <div v-for="i in $store.getters.allLists"
                 :key="i.id">
                <router-link
                    :to="{name: 'list', params: {id: i.id}}"
                    class="list-item">{{i.name}}</router-link>
            </div>
            <link-box class="list-item" 
                      placeholder="New list name"
                      @confirm-linkbox="newListHandler">New Item</link-box>
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
import {TodoListDocument} from "../store/Models";
import LinkBox from "./LinkBox.vue"
import { collections } from "../js/Firebase";

export default Vue.extend({
    components: {
        "link-box": LinkBox
    },
    methods: {
        newListHandler(name: string) {
            TodoListDocument.createDocument(collections.lists, name, this.$store.getters.uid)
                .then(v => {
                    this.$router.push({name: "editList", params: {id: v.id}});
                })
                .catch(reason => 
                   console.error("[AppUserPage] Could not create new list: " + reason)
                )
        }
    }
})
</script>
