
const CardComponent = {
    props: {
        "item": Object,
        "activeItem": Number
    },
    computed: {
        "isActive": function() {
            return this.activeItem === this.item.key;
        }
    },
    template: `
    <li v-bind:class="{card: true, active: isActive}">
        <h1>{{ item.title }}</h1>
        <p v-if="item.desc">{{ item.desc }}</p>
    </li>
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
    template: `
    <ul class="card-list">
        <card-component v-for="i in items" 
                        v-bind:item="i"
                        :key="i.key"
                        v-bind:activeItem="activeItem">
        </card-component>
    </ul>
    `
});

const vm = new Vue({
    el: "#vue-app",
    data: {
        "items": []
    }
})