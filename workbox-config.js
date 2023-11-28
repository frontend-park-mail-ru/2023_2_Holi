module.exports = {
    globDirectory: 'bundle/',
    globPatterns: [
        '**/*.{css,js,ico,html,png,jpg,svg}',
    ],
    swDest: 'dist/sw.js',
    swSrc: 'sw.js',
    ignoreURLParametersMatching: [
        /^utm_/,
        /^fbclid$/,
    ],
};
