const webpack = require('webpack');
module.exports = function (paths) {
    return {
        plugins: [
            new webpack.HotModuleReplacementPlugin({}),
        ],
        devServer: {
            historyApiFallback: true,
            https: true,
            port: 3348,
            hot: true,
            noInfo: false,
            inline: true,
            contentBase: paths.source,
            compress: true,
            proxy: {
                '/images/': {
                    target: process.env.url === 'dev' ? 'https://dev.telepay.io' : 'https://telepay.io',
                    secure: false,
                    logLevel: 'debug',
                    changeOrigin: true
                }
            }
        },
    };
};
