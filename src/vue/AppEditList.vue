<template>
    <div id="app-card-editor"
         class="full-page-container">
        <app-bar
            :title="activeModel.name"
            :modelId="id"></app-bar>
        <card-list
            :editing=true
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
    components: {
        'app-bar': TheAppBar,
        'card-list': CardList
    }
});
</script>