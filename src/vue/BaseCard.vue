<template>
    <section class="card">
        <h1>{{ value.title }}</h1>
        <p v-if="item.desc">{{ value.desc }}</p>
    </section>
</template>

<style lang="scss">
@import "../sass/card";
</style>

<script>
export default {
    props: {
        "value": Object
    }
};
</script>