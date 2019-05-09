<template>
    <div id="the-appbar">
        <div>Back</div>
        <div>Title</div>
        <div>Edit</div>
    </div>
</template>

<style lang="scss">
    #the-appbar {
        display: flex;
        flex-direction: row;
        justify-content: space-around;

        opacity: 0;
        transition: opacity 0.5s;

        &:hover {
            opacity: 1.0;
        }

        &:focus {
            opacity: 1.0;
        }
    }
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    
})
</script>
