import * as path from "path";

import * as webpack from "webpack";
import TerserPlugin = require("terser-webpack-plugin");

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
        },
    ],
};

const externals: webpack.ExternalsElement[] = [
    "bufferutil", //
    "utf-8-validate",
];
const stats: webpack.Options.Stats = {
    warningsFilter: [
        /express\/lib/, //
    ],
};

export const config: webpack.ConfigurationFactory = (env, args) => {
    console.log({ env, args });
    const isProduction = args?.mode === "production" || process.env.NODE_ENV === "production";
    const mode = isProduction ? "production" : "development";
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
        stats,
        optimization: {
            minimize: isProduction,
            minimizer: [new TerserPlugin()],
        },
    };
};

export default config;
