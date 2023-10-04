module.exports = {
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 2022, // Или более новая версия, в зависимости от ваших потребностей
        sourceType: 'module', // Для поддержки модулей ES6
        allowImportExportEverywhere: true
    },
    env: {
        browser: true, // Указываем, что код будет выполняться в браузерной среде
        node: true,    // Если ваш код также выполняется в Node.js
    },
    overrides: [
        {
            files: ['**/*.js'], // Можете настроить паттерн для файлов
            excludedFiles: 'dist/**', // Игнорируем файлы и папки внутри dist
        },
    ],
};