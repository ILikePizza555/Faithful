
class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    get percievedBrightness() {
        return 0.299 * this.r + 0.578 * this.g + 0.114 * this.b;
    }
}

function colorFromHex(hexCode) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hexCode = hexCode.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexCode);
    return result ? new Color(
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ) : null;
}

const CardComponent = {
    props: {
        "item": Object,
        "activeItem": Number
    },
    template: `
    <section class="card" :class="activeItem > item.id && 'done'">
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
        "move": function(itemNumber) {
            const i = typeof(itemNumber) === "number" ? itemNumber : this.activeItem + 1;

            this.activeItem = i;
            setTimeout(() => this.$scrollTo(this.$refs.cardList[i].$el, {}), 300);

            this.$root.setBackground(this.items[i].background);
        }
    },
    template: `
    <main v-on:click="move" class="card-list">
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
    methods: {
        "setBackground": function(background) {
            const bg = background || {"color": white};

            this.background = bg;
        }
    },
    computed: {
        "fontColor": function() {
            if(colorFromHex(this.background.color).percievedBrightness > 150) {
                return "#000";
            }
            return "#fff";
        }
    },
    data: {
        "background": {
            "color": "#fff"
        },
        "items": [
            {
                id: 0,
                title: "🚿 Take a shower",
                background: { color: "#f0f8ff"}
            },
            {
                id: 1,
                title: "💊 Take medications",
                background: { color: "#fff6f0"}
            },
            {
                id: 2,
                title: "👗 Wear something pretty~",
                background: {color: "#ff4f4f"}
            }
        ]
    }
})

vm.setBackground(vm.items[0].background);