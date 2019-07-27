<template lang="pug">
    section.card(:style="{backgroundColor: backgroundColor}")
        header {{title}}
        p {{description}}
</template>

<style lang="scss">
    .card {
        display: block;
        width: 100%;

        border-radius: 15px;
        padding: 15px;

        box-shadow: 0px 1px 2px rbga(0, 0, 0, 0,5);
    }
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        title: String,
        description: String,
        backgroundColor: String
    }
})
</script>
