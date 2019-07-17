<!-- Main page of the app. Mostly static. Shows some information and displays a login prompt -->
<template lang="pug">
    div#index-app
        header.index-header.block-container
            div.info-block
                h1 It's time to get things done.
                p Build habits and manage your life with Faithful.
            div.login-block
                p Let's get started:
                firebase-auth-ui(onSuccess="/user")
</template>

<style lang="scss">
@import "../sass/variables.scss";

.index-header {
    background-image: linear-gradient(#ffd9b8, $page-bg-color);

    height: 60vh;

    padding: 8px;

    align-items: center;
    flex-wrap: wrap;
}

</style>

<script lang="ts">
import Vue from 'vue'
import TheFirebaseLogin from "./TheFirebaseLogin.vue";
export default Vue.extend({
    components: {
        "firebase-auth-ui": TheFirebaseLogin
    }
})
</script>
