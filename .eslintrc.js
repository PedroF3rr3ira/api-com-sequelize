module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ["airbnb-base", "prettier"],
    plugins: ["prettier"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto",
            },
        ],
        "linebreak-style": 0,
        "no-param-reassign": "off",
        "class-methods-use-this": "off",
        camelcase: "off",
        "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    },
};
