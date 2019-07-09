<!-- Firebase login component -->
<template>
    <div id="firebase-auth-container"></div>
</template>

<script lang="ts">
import * as firebaseui from "firebaseui"
import {firebase} from "../script/Firebase"
import Vue from 'vue'
import { isFunction } from "util"

const signInOptions = [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
]

export default Vue.extend({
    props: ["onSuccess"],
    mounted: function() {
        const successCallback = (authResult: firebase.auth.UserCredential) => {
            if (isFunction(this.onSuccess)) {
                return this.onSuccess(authResult) || false;
            }

            this.$router.push(this.onSuccess);
        }

        const uiConfig = {
            signInOptions,
            callbacks: {
                signInSuccessWithAuthResult: successCallback
            }
        }

        console.log("[TheFirebaseLogin.vue] Starting firebase auth ui...");
        const ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start(this.$el, uiConfig);
    }
})
</script>


