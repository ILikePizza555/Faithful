<template lang="pug">
    div.card-list-container
        div.card-list.center
            card-vue(v-for="item in model.items" 
                 :key="item.id" 
                 :title="item.title" 
                 :description="item.description"
                 :backgroundColor="item.backgroundColor")
</template>

<style lang="scss">
    .card-list-container {
        overflow-y: scroll;
    }

    .card-list {
        height: 100%;

        & > * {
            margin-bottom: 100vh;
        }

        & > *:first-child {
            margin-top: 30vh;
            margin-bottom: 70vh;
        }

        & > *:last-child {
            margin-bottom: 65vh;
        }
    }
</style>


<script lang="ts">
import Vue from 'vue'
import RoutineDocument from '../store/models/Routine';
import CardVue from './Card.vue';
export default Vue.extend({
    props: {
        model: {
            type: RoutineDocument,
            required: true
        }
    },
    components: {
        "card-vue": CardVue 
    }
})
</script>
