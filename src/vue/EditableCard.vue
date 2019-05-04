<template>
    <section class="card styled-inputs">
        <h1>
            <input v-if="editing"
                   v-bind:value="value.title"
                   v-on:input="$emit('input', {...value, title: $event.target.value})"
                   type="text">
            <span v-else>{{value.title}}</span>
        </h1>
        <input v-if="editing"
               v-bind:value="value.desc"
               v-on:input="$emit('input', {...value, desc: $event.target.value})"
               type="text">
        <span v-else>{{value.desc}}</span>
    </section>
</template>

<style lang="scss">
@import "../sass/styled-inputs.scss";
@import "../sass/card.scss";
</style>


<script lang="ts">
import Vue from 'vue'
import BaseCard from "./BaseCard.vue";

export default Vue.extend({
    extends: BaseCard,
    props: ["editing"]
})
</script>
