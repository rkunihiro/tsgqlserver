module.exports = {
    presets: [
        ["@babel/preset-typescript", {}],
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
};
