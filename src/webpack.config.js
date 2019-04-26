/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    context: __dirname,
    entry: {
        app: path.join(__dirname, "js", "app.js"),
        index: path.join(__dirname, "js", "index.js")
    },
    resolve: {
        extensions: [".ts", ".js", ".vue"],
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            { 
                test: /\.hbs$/, 
                loader: "handlebars-loader" 
            },
            {
                test: /\.(html)$/,
                use: "html-loader"
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: "app.html",
            template: path.resolve("src", "html", "app.hbs"),
            chunks: ["app"],
            title: "Faithful",
            scripts: [
                "https://cdn.jsdelivr.net/npm/vue/dist/vue.js",
                "https://www.gstatic.com/firebasejs/5.10.1/firebase-app.js",
                "https://www.gstatic.com/firebasejs/5.10.1/firebase-auth.js",
                "https://www.gstatic.com/firebasejs/5.10.1/firebase-firestore.js"
            ],
            meta: {
                "viewport": "width=device-width, initial-scale=1, shrink-to-fit=no",
                "charset": "utf-8"
            }
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve("src", "html", "index.hbs"),
            chunks: ["index"],
            title: "Faithful",
            styles: [
                "https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css"
            ],
            scripts: [
                "https://www.gstatic.com/firebasejs/5.10.1/firebase-app.js",
                "https://www.gstatic.com/firebasejs/5.10.1/firebase-auth.js",
                "https://www.gstatic.com/firebasejs/5.10.1/firebase-firestore.js",
                "https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.js"
            ],
            meta: {
                "viewport": "width=device-width, initial-scale=1, shrink-to-fit=no",
                "charset": "utf-8"
            }
        })
    ],
    externals: {
        vue: "Vue",
        firebase: "firebase",
        firebaseui: "firebaseui"
    },
    output: {
        filename: "[name].js",
        path: path.normalize(path.join(__dirname, "..", "dist"))
    },
    devtool: "inline-cheap-source-map"
}