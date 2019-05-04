<template>
    <section class="card styled-inputs">
        <h1>
            <input v-bind:value="value.title"
                   v-on:input="$emit('input', {...value, title: $event.target.value})"
                   type="text">
        </h1>
        <input v-bind:value="value.desc"
               v-on:input="$emit('input', {...value, desc: $event.target.value})"
               type="text">
    </section>
</template>

<style lang="scss">
@import "../sass/styled-inputs.scss";
@import "../sass/card.scss";
</style>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: ["value"]
})
</script>
