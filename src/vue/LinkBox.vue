<!-- Initaially displays as a link, and when clicked, turns into a text box.
When done, an event is fired with the textbox data as the payload -->
<template>
    <div class="link-box-container">
        <div class="textbox-container"
             v-if="hit">
             <input type="text"
                    :value="inputText">
             <button v-if="confirmButton"
                     @click="$emit(ConfirmEvent, inputText)">{{confirmButton}}</button> 
        </div>
        <div class="link"
             v-else>
            <a href="#"
               @click="hit = true"><slot></slot></a>
        </div>
    </div>
</template>

<style lang="scss">

</style>

<script lang="ts">
import Vue from 'vue'

export const ConfirmEvent = "confirm-linkbox";

export default Vue.extend({
    data: function() {
        return {
            hit: false,
            inputText: ""
        }
    },
    props: {
        confirmButton: {
            type: String,
            default: "OK"
        }
    }
})
</script>
