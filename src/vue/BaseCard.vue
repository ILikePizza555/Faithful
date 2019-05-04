<template>
    <section class="card">
        <h1>{{ value.title }}</h1>
        <p v-if="item.desc">{{ value.desc }}</p>
    </section>
</template>

<style lang="scss">
@import '../sass/variables';

.card {
    display: block;
    width: 100%;

    height: 100vh - $cardpadding-top;
    padding-top: $cardpadding-top;

    opacity: 1;
    line-height: 1.2;
    font-size: 16px;
}

.card h1 {
    font-size: 3rem;
}

.card.done {
    opacity: 0.3 !important;
}
</style>

<script>
export default {
    props: {
        "value": Object
    }
};
</script>