module.exports = function() {
    return {
        module: {
            rules: [{
                test: /\.(jpg|png|gif)$/,
                loader: 'file-loader',
            }, {
                test: /\.svg$/,
                exclude: [/fonts\//],
                loader: 'svg-inline-loader',
                options: {
                    prefix: 'inl-svg'
                },
            }, ],
        },
    };
};