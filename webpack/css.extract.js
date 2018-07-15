const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (paths) {
    return {
        module: {
            rules: [{
                test: /\.(sa|sc|c)ss$/,
                include: paths,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader?minimize=true',
                    'sass-loader',
                ]
            }],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].[hash].css',
            })
        ],
    };
};
