/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    context: __dirname,
    entry: path.join(__dirname, "script", "index.ts"),
    resolve: {
        extensions: [".ts", ".js", ".vue"]
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
                test: /\.pug$/, 
                loader: "pug-plain-loader"
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
            filename: "index.html",
            template: path.resolve("src", "html", "index.pug"),
            title: "Faithful",
            styles: [
                "https://unpkg.com/normalize.css@8.0.1/normalize.css",
                "https://fonts.googleapis.com/icon?family=Material+Icons",
                "https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css"
            ],
            scripts: [
                "https://cdn.jsdelivr.net/npm/vue/dist/vue.js",
                "https://unpkg.com/vuex@3.1.1/dist/vuex.js",
                "https://unpkg.com/vue-router/dist/vue-router.js",
                "https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js",
                "https://www.gstatic.com/firebasejs/6.1.0/firebase-auth.js",
                "https://www.gstatic.com/firebasejs/6.1.0/firebase-firestore.js",
                "https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.js"
            ],
            meta: {
                "viewport": "width=device-width, initial-scale=1, shrink-to-fit=no",
                "charset": "utf-8"
            }
        })
    ],
    externals: [
        {
            vue: "Vue",
            vuex: "Vuex",
            "vue-router": "VueRouter",
            "firebase/app": "firebase",
            "firebase/auth": "firebase.auth",
            "firebase/firestore": "firebase.firestore",
            firebaseui: "firebaseui",
        }
    ],
    output: {
        filename: "[name].js",
        path: path.normalize(path.join(__dirname, "..", "dist"))
    },
    devtool: "inline-cheap-source-map",
    devServer: {
        historyApiFallback: {
            rewrites: [
                {from: /^\/app\/?.*$/, to: "/app.html"}
            ]
        }
    }
}