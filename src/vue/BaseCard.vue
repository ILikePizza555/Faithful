<template>
    <div class="card-container">
        <section class="card">
            <h1>{{ value.title }}</h1>
            <p v-if="item.desc">{{ value.desc }}</p>
        </section>
    </div>
</template>

<style lang="scss">
@import "../sass/card";
</style>

<script>
export default {
    props: {
        "model": Object,
        "index": Number
    },
    computed: {
        value() {
            return this.model.items[this.index];
        }
    }
};
</script>