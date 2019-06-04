<!-- Initaially displays as a link, and when clicked, turns into a text box.
When done, an event is fired with the textbox data as the payload -->
<template>
    <div class="link-box-container">
        <div class="textbox-container"
             v-if="hit">
             <input type="text"
                    v-model="inputText"
                    :placeholder="placeholder"
                    ref="textbox">
             <button v-if="confirmButton"
                     @click="$emit('confirm-linkbox', inputText)">{{confirmButton}}</button> 
        </div>
        <div class="link"
             v-else>
            <a href="#"
               @click="handleLinkClick"><slot></slot></a>
        </div>
    </div>
</template>

<style lang="scss">

</style>

<script lang="ts">
import Vue from 'vue'

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
        },
        placeholder: String
    },
    methods: {
        handleLinkClick() {
            this.hit = true;

            // Wait until the component is rendered again. Then select the textbox.
            Vue.nextTick().then(() => {
                const textboxEl: HTMLInputElement = this.$refs.textbox as HTMLInputElement;

                textboxEl.focus();
                textboxEl.select();
            })
            
        }
    }
})
</script>
