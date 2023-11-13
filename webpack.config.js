const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WorkBoxWebpackPlugin = require('workbox-webpack-plugin');

console.info(__dirname);
module.exports = {
    entry: './index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'bundle'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                useBuiltIns: 'entry', // Включение только необходимых полифилов
                                corejs: 3, // Версия библиотеки core-js
                            }],
                        ],
                    },
                },
            },
            {
                test: /\.(m4v)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'video/[name].[ext]', // путь внутри бандла для шрифтов
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-preset-env',
                                    ['cssnano', { preset: 'default' }],
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[ext]',
                            publicPath: '/',
                        },
                    },
                ],
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                options: {
                    partialDirs: path.resolve(__dirname, 'src/'), // путь к директории с частичными шаблонами Handlebars
                },
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin({
                minimizerOptions: {

                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true,

            },
            publicPath: '/',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/static/img', to: 'img' },
                { from: 'src/static/video', to: 'video' },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new WorkBoxWebpackPlugin.InjectManifest({
            swSrc: '/sw.js',
            swDest: 'sw.js',
        }),
    ],
};
