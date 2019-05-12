<template>
    <div id="the-appbar">
        <div class="item">
            <a href="#" class="back-button"></a>
        </div>
        <div class="item">Title</div>
        <div class="item">Edit</div>
    </div>
</template>

<style lang="scss">
@import "../sass/common";

#the-appbar {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    opacity: 0;
    transition: opacity 0.5s;

    height: $appbar-height;

    &:hover {
        opacity: 1.0;
    }

    &:focus {
        opacity: 1.0;
    }

    > .item {
        display: block;
        height: 100%;
    }
}

.back-button {
    height: 100%;
    width: fit-content;

    padding: 0 0.5em 0 1em;

    @include flex-center-column();
}

.back-button::after {
    display: block;
    content: "";

    width: 1em;
    height: 1em;

    border-left: #212121 2px solid;
    border-bottom: #212121 2px solid;

    transform: rotateZ(45deg);
}
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    
})
</script>
