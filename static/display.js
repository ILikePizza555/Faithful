
const CardComponent = {
    props: {
        "item": Object,
        "activeItem": Number
    },
    computed: {
        "isActive": function() {
            return this.activeItem === this.item.id;
        }
    },
    template: `
    <section v-bind:class="{card: true, active: isActive}">
        <h1>{{ item.title }}</h1>
        <p v-if="item.desc">{{ item.desc }}</p>
    </section>
    `
};

const CardList = Vue.component("card-list", {
    data: function() {
        return {
            "activeItem": 0
        };
    },
    props: ["items"],
    components: {
        "card-component": CardComponent
    },
    methods: {
        "next": function() {
            this.$scrollTo()
        }
    },
    template: `
    <main class="card-list">
        <card-component v-for="i in items" 
                        :item="i"
                        :key="i.id"
                        :activeItem="activeItem"
                        ref="cardList">
        </card-component>
    </main>
    `
});

const vm = new Vue({
    el: "#vue-app",

    data: {
        "items": [
            {
                id: 0,
                title: "Item 1"
            },
            {
                id: 1,
                title: "Item 2"
            },
            {
                id: 2,
                title: "Item 3"
            }
        ]
    }
})