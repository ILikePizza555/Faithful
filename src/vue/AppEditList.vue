<template>
    <div id="app-card-editor"
         class="full-page-container">
        <app-bar
            behavior="stay"
            :editing="true"
            :title="'Editing: ' + activeModel.name"
            :modelId="id"
            @app-back="$router.push("/")"
            @edit-done="handleEditDone"></app-bar>
        <card-list
            :editing="true"
            :model="activeModel"></card-list>
    </div>
</template>

<style lang="scss">
</style>

<script lang="ts">
import Vue from "vue";
import CardList, {UpdateActiveItemEvent} from "./CardList.vue";
import TheAppBar from "./TheAppBar.vue";

export default Vue.extend({
    props: {
        id: {
            type: String,
            required: true
        }
    },
    computed: {
        activeModel() {
            return this.$store.getters.listById(this.id)
        }
    },
    methods: {
        handleEditDone() {

        }
    },
    components: {
        'app-bar': TheAppBar,
        'card-list': CardList
    }
});
</script>