module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: '2015',
        sourceType: 'module',
    },
    rules: {
        '@typescript-eslint/array-type': [
            'error',
            {
                default: 'generic',
            },
        ],
    },
}
