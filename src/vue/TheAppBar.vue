<template>
    <div id="the-appbar" :class="behavior">
        <div class="item">
            <a
                href="#"
                class="back-button flex-center-column"
                @click="$emit('app-back')"></a>
        </div>
        <div class="item flex-center-column">{{title}}</div>
        <div class="item flex-center-column">
            <router-link
                v-if="!editing"
                :to="editLink">
                <i class="material-icons">create</i>
            </router-link>
            <a
                href="#"
                v-else="editing" 
                @click="$emit('edit-done')">
                <i class="material-icons">done</i>
            </a>
        </div>
    </div>
</template>

<style lang="scss">
@import "../sass/common";

#the-appbar {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    height: $appbar-height;

    > .item {
        height: 100%;
    }
}

.fade-away {
    opacity: 0;
    transition: opacity 0.5s;

    &:hover {
        opacity: 1.0;
    }

    &:focus {
        opacity: 1.0;
    }
}

.stay {
    opacity: 1;
}

.back-button {
    height: 100%;
    width: fit-content;

    padding: 0 0.5em 0 1em;
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

<script>
import Vue from 'vue'
export default Vue.extend({
    props: {
        "backUrl": {
            default: "/"
        },
        "title": String,
        "modelId": {
            type: String,
            required: true
        },
        "behavior" : {
            default: "fade-away"
        },
        "editing": {
            type: Boolean,
            default: false
        }
    },
    computed: {
        editLink() {
            return {
                name: "editList",
                params: {
                    id: this.modelId
                }
            }
        }
    }
})
</script>
