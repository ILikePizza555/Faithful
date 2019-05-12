<template>
    <div id="app-card-editor"
         class="full-page-container">
        <app-bar>
        </app-bar>
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
    components: {
        'app-bar': TheAppBar,
        'card-list': CardList
    }
});
</script>