const path = require("path");

const TerserPlugin = require("terser-webpack-plugin");

/** @type {import('webpack').RuleSetRule} */
const tsRule = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
        {
            loader: "babel-loader",
        },
    ],
};

/** @returns {import('webpack').Configuration} */
module.exports = function config(env, args) {
    console.log({ env, args });
    const isProduction = args?.mode === "production";
    const mode = isProduction ? "production" : "development";
    return {
        mode,
        entry: {
            server: "./src/index.ts",
        },
        devtool: isProduction ? "hidden-source-map" : "source-map",
        output: {
            path: path.resolve(__dirname, "./dist"),
            filename: "[name].js",
        },
        module: {
            rules: [tsRule],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".mjs", ".jsx", ".js", ".json"],
        },
        target: "node",
        // externals: [
        //     "bufferutil", //
        //     "utf-8-validate",
        // ],
        ignoreWarnings: [
            { module: /express/ }, //
        ],
        optimization: {
            minimize: isProduction,
            minimizer: [new TerserPlugin()],
        },
    };
};
