const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        "index": path.join(__dirname, "src", "scripts", "index.js")
    },
    module: {
        rules: [
            {
                test: /\.(s[ac]ss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Simple Calculator',
            template: path.join(__dirname, "src", "index.html"),
            favicon: path.join(__dirname, "src", "assets", "images", "icon.svg"),
            filename: "index.html",
            minify: true,
        })
    ]
}