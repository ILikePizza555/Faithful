<!-- The last card in a CardList. Either displays a congratulatory message, or, if editing,
a button which adds a new entry into the list. -->
<template>
    <div class="card-container viewport">
        <section class="card">
            <button
                class="add-button"
                @click="$emit('newItemClick')"
                v-if="editing">
                <i class="material-icons">add</i>
                <span class="button-text">Add new item</span>
            </button>
            <h2 v-else>
                🎉 You've completed everything! Good job!
            </h2>
        </section>
    </div>
</template>

<style lang="scss">
@import "../sass/card";

.add-button {
    border: none;
    background: none;

    &:hover {
        cursor: pointer;
    }

    .material-icons {
        vertical-align: middle !important;
        line-height: 1.15;
    }

    .button-text {
        vertical-align: middle !important;
        line-height: 1.15;
    }
}
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        "editing": {
            type: Boolean,
            default: false
        }
    }
})
</script>
