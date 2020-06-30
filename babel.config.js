module.exports = {
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
                corejs: { version: "3.16", proposals: true },
                debug: true,
            },
        ],
    ],
};
