import * as path from "path";

import * as webpack from "webpack";

const nodeExternals = require("webpack-node-externals");
const TerserPlugin = require("terser-webpack-plugin");

const entry: webpack.Entry = {
    server: "./src/index.ts",
};

const output: webpack.Output = {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
};

const tsRule: webpack.RuleSetRule = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
        {
            loader: "babel-loader",
            options: {
                presets: [
                    "@babel/preset-typescript",
                    [
                        "@babel/preset-env",
                        {
                            loose: true,
                            modules: false,
                            targets: {
                                node: 12,
                            },
                            useBuiltIns: "usage",
                            corejs: 3,
                            debug: true,
                        },
                    ],
                ],
                plugins: [
                    //
                    ["@babel/plugin-proposal-nullish-coalescing-operator"],
                    ["@babel/plugin-proposal-optional-chaining"],
                ],
            },
        },
    ],
};

export const config: webpack.ConfigurationFactory = (env, args) => {
    console.log({ env, args });
    const isProduction = args?.mode === "production" || process.env.NODE_ENV === "production";
    const mode = isProduction ? "production" : "development";
    let externals = ["bufferutil", "utf-8-validate"];
    let plugins = [
        // replace express/lib
        new webpack.ContextReplacementPlugin(/express\/lib/, path.resolve("node_modules"), { ejs: "ejs" }),
    ];
    if (!isProduction) {
        externals = nodeExternals();
        plugins = [];
    }
    return {
        mode,
        entry,
        devtool: isProduction ? "hidden-source-map" : "source-map",
        output,
        module: {
            rules: [tsRule],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".mjs", ".jsx", ".js", ".json"],
        },
        target: "node",
        externals,
        optimization: {
            minimize: isProduction,
            minimizer: [new TerserPlugin()],
        },
        plugins,
    };
};

export default config;
