<template>
    <section class="card styled-inputs">
        <template v-if="editing">
            <h1>
                <input
                    :value="value.title"
                    @input="$emit(EditTitleEvent, {value, edit: $event.target.value})"
                    type="text">
            </h1>
            <input
                :value="value.desc"
                @input="$emit(EditDescEvent, {value, edit: $event.target.value})"
                type="text">
        </template>
        <template v-else>
            <h1>{{value.title}}</h1>
            <span>{{value.desc}}</span>
        </template>
    </section>
</template>

<style lang="scss">
@import "../sass/styled-inputs.scss";
@import "../sass/card.scss";
</style>


<script lang="ts">
import Vue from 'vue'
import BaseCard from "./BaseCard.vue";

export const EditTitleEvent = "edit-title";
export const EditDescEvent = "edit-desc";

export default Vue.extend({
    extends: BaseCard,
    props: ["editing"]
})
</script>
