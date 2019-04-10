<template>
    <section class="card">
        <h1>{{ item.title }}</h1>
        <p v-if="item.desc">{{ item.desc }}</p>
    </section>
</template>

<style lang="scss">
@import '../sass/variables';

.card {
    display: block;
    width: 100%;

    height: 100vh - $cardpadding-top;
    padding-top: $cardpadding-top
}
</style>

<script>
export default {
    props: {
        "item": Object
    }
};
</script>