<!-- The last card in a CardList. Either displays a congratulatory message, or, if editing,
a button which adds a new entry into the list. -->
<template>
    <div class="card-container viewport">
        <section class="card">
            <button
                @click="$emit('newItemClick')"
                v-if="editing">
                <i class="material-icons">add</i>
                Add new item
            </button>
            <p v-else>
                🎉 You've completed everything! Good job!
            </p>
        </section>
    </div>
</template>


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
