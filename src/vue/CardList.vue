<template lang="pug">
    main.card-list-container.center
        card-vue(v-for="item in model.items" 
                 :id="item.id" 
                 :title="item.title" 
                 :description="item.description"
                 :backgroundColor="item.backgroundColor")
</template>

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
