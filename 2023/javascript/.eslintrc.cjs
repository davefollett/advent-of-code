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
        // https://stackoverflow.com/a/42237667
        "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
        // https://stackoverflow.com/a/66902167
        "no-param-reassign": [
            "error",
            {
              "props": true,
              "ignorePropertyModificationsFor": ["accu"]
            }
        ],
    }
}
