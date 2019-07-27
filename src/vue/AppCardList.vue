<template>
    <div id="app-card-list" 
         class="full-page-container">
        <app-bar
            style="flex: 0 0 auto"
            :title="activeModel.name"
            :modelId="id"
            @app-back="$router.push('/')"></app-bar>
        <card-list
            style="flex-grow: 1"
            :model="activeModel"></card-list>
    </div>
</template>

<style lang="scss">
@import "../sass/common";

#app-card-list {
    display: flex;
    flex-direction: column;
}
</style>

<script lang="ts">
import Vue from 'vue'
import RoutineDocument from "../store/models/Routine";
import CardList from "./CardList.vue";
import TheAppBar from "./TheAppBar.vue";

/**
 * The type of of an instance of this Vue component.
 * Used for `this`-typing in methods and computed properties
 */
interface AppCardList extends Vue {
    id: string;
    activeModel: RoutineDocument;
}

export default Vue.extend({
    data: function() {
        return {
            currentIndex: 0,
        }
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    computed: {
        activeModel(this: AppCardList) {
            return this.$store.getters.listById(this.id)
        }
    },
    methods: {
    },
    components: {
        "card-list": CardList,
        "app-bar": TheAppBar
    }
});
</script>
