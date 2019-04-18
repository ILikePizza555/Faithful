/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackCdnPlugin = require("webpack-cdn-plugin");
const path = require("path");

module.exports = {
    context: __dirname,
    entry: {
        app: path.join(__dirname, "js", "app.js"),
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
            template: path.normalize(path.join(__dirname, "html", "template.hbs")),
            title: "Faithful",
            meta: {
                "viewport": "width=device-width, initial-scale=1, shrink-to-fit=no",
                "charset": "utf-8"
            }
        }),
        new WebpackCdnPlugin({
            modules: [
                {
                    name: "vue",
                    var: "Vue",
                    path: "dist/vue.common.dev.js"
                }
            ]
        })
    ],
    output: {
        filename: "bundle.js",
        path: path.normalize(path.join(__dirname, "..", "..", "dist"))
    },
    devtool: "inline-cheap-source-map"
}