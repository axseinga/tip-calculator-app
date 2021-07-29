const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/js/index.js",

    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "",
        filename: "bundle.js",
    },

    mode: "development",

    plugins: [
        new HtmlWebpackPlugin({
            template: `./index.html`,
            filename: "index.html",
        }),
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },

            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require.resolve("dart-sass"),
                        },
                    },
                ],
            },
        ],
    },
};
