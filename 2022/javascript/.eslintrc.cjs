module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: 'airbnb-base',
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        // https://github.com/airbnb/javascript/issues/2134#issuecomment-670779229
        'import/extensions': [
            'error',
            'ignorePackages'
        ],
        'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
        "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
    }
}
