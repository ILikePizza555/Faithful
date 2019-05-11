<template>
    <div class="card-container viewport">
        <section class="card styled-inputs">
            <template v-if="editing">
                <h1>
                    <input
                        :value="value.title"
                        @input="handleEdit({title: $event.target.value})"
                        type="text">
                </h1>
                <input
                    :value="value.desc"
                    @input="handleEdit({desc: $event.target.value})"
                    type="text">
            </template>
            <template v-else>
                <h1>{{value.title}}</h1>
                <span>{{value.desc}}</span>
            </template>
        </section>
    </div>
</template>

<style lang="scss">
@import "../sass/styled-inputs.scss";
@import "../sass/card.scss";
</style>


<script lang="ts">
import Vue from 'vue'
import {updateTodoItem} from "../store/Mutations";
import BaseCard from "./BaseCard.vue";
import {TodoListDocument} from '../store/Models';

type EditableCardComponent = Vue.VueConstructor<{
    model: TodoListDocument;
    index: number;
} & Vue>

export default (Vue as EditableCardComponent).extend({
    extends: BaseCard,
    props: ["editing"],
    methods: {
        handleEdit(change: {title: string} | {desc: string}) {
            this.$store.commit(updateTodoItem, {
                todoListId: this.model.id,
                itemId: this.index,
                type: "change",
                change
            });
        }
    }
})
</script>
