<template>
    <main v-on:click="move" class="card-list">
        <card v-for="i in items"
              :item="i"
              :key="i.id"
              ref="cardList">
        </card>
    </main>
</template>

<script>
import Card from "./Card.vue";
import "vue-scrollto";

export default {
    data: function () {
        return {
            "activeItem": 0
        };
    },
    props: ["items"],
    components: {
        "card": Card
    },
    methods: {
        "move": function(itemNumber) {
            const i = typeof(itemNumber) === "number" ? itemNumber : this.activeItem + 1;

            this.activeItem = i;
            setTimeout(() => this.$scrollTo(this.$refs.cardList[i].$el, {}), 300);

            this.$root.setBackground(this.items[i].background);
        }
    }
}
</script>
