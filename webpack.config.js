const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "./src/app.ts"),
    mode: "development",
    devtool: false,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js",
        module: true,
        library: {
            type: "module"
        }
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.s?[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
            inject: "body"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin(),
            new CssMinimizerPlugin()
        ],
    },
    experiments: {
        outputModule: true
    }
};
