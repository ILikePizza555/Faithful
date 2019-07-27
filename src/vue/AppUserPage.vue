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
        </div>
    </div>
</template>

<style lang="scss">
@import "../sass/common.scss";

#tl-list {
    display: flex;
    flex-direction: column;
}

#link-box {
    margin-top: 1em;
}
</style>

<script lang="ts">
import Vue from "vue"
import RoutineDocument from "../store/models/Routine";
import { collections } from "../script/Firebase";

export default Vue.extend({
    components: {
    },
    methods: {
        newListHandler(name: string) {
            /*RoutineDocument.createDocument(collections.lists, name, this.$store.getters.uid)
                .then(v => {
                    this.$router.push({name: "editList", params: {id: v.id}});
                })
                .catch(reason => 
                   console.error("[AppUserPage] Could not create new list: " + reason)
                )*/
        }
    }
})
</script>
