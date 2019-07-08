<!-- Main page of the app. Mostly static. Shows some information and displays a login prompt -->
<template lang="pug">
    div#index-app
        header.index-header.block-container
            div.info-block
                h1 It's time to get things done.
                p Build habits and manage your life with Faithful.
            div.login-block
                p Let's get started:
                div#firebaseui-auth-container
</template>

<style lang="scss">
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    
})
</script>
