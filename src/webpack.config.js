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
                test: /\.pug$/, 
                loader: "pug-loader"
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
            template: path.resolve("src", "html", "app.pug"),
            chunks: ["app"],
            title: "Faithful",
            styles: [
                "https://unpkg.com/normalize.css@8.0.1/normalize.css",
                "https://fonts.googleapis.com/icon?family=Material+Icons"
            ],
            scripts: [
                "https://cdn.jsdelivr.net/npm/vue/dist/vue.js",
                "https://unpkg.com/vuex@3.1.1/dist/vuex.js",
                "https://unpkg.com/vue-router/dist/vue-router.js",
                "https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js",
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
            template: path.resolve("src", "html", "index.pug"),
            chunks: ["index"],
            title: "Faithful",
            styles: [
                "https://unpkg.com/normalize.css@8.0.1/normalize.css",
                "https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css"
            ],
            scripts: [
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