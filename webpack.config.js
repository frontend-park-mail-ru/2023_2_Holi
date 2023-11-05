const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        app: './index.js', // Ваш главный файл с ES6 модулями
        iife: './dist/combinedIIFE.js', // Ваши IIFE-файлы
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[id].[chunkhash].js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Настройте Babel для транспиляции ES6 модулей
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()], // Минимизация с помощью Terser
    },
};