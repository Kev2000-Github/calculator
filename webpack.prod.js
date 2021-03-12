const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].[contenthash].js",
        path: path.join(__dirname, "docs"),
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.(s[ac]ss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader', 'sass-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" })
    ]
});