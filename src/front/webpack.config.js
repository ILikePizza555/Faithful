/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackCdnPlugin = require("webpack-cdn-plugin");
const path = require("path");

module.exports = {
    context: __dirname,
    entry: path.join(__dirname, "js", "index.js"),
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
                test: /\.(html)$/,
                use: "html-loader"
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.normalize(path.join(__dirname, "html", "index.html"))
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
        path: path.join(__dirname, "dist")
    }
}