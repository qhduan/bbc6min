"use strict";

var path =    require("path");
var webpack = require("webpack");

module.exports = {
    entry: [
        "console-polyfill",
        "babel-polyfill",
        path.resolve(__dirname, "..", "client", "app.js")
    ],
    module: {
    loaders: [
        {
            test: /\.(woff2?|ttf|eot|svg)$/,
            loader: "url?limit=1000000"
        },
        { // babel
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel"
        },
        { // CSS
            test: /\.css$/,
            loader: "style!css"
        },
        { // SASS
            test: /\.scss$/,
            loader: "style!css!sass"
        }
    ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": "\"production\""
        }),
        new webpack.ProvidePlugin({
            "d3": "d3",
            "_": "lodash"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    output: {
        path: path.resolve(__dirname, "..", "public"),
        publicPath: "/",
        filename: "app.js"
    }
};
