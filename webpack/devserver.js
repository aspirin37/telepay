const webpack = require('webpack');
module.exports = function (paths, env) {
    let OFFICE_URL;
    switch(env.url) {
    case 'loc':
        OFFICE_URL = 'http://0.0.0.0:8080';
        break;
    case 'dev':
        OFFICE_URL = 'https://dev.telepay.io';
        break;
    default:
        OFFICE_URL = 'https://telepay.io';
        break;
    }

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
                    target: OFFICE_URL,
                    secure: false,
                    logLevel: 'debug',
                    changeOrigin: true
                }
            }
        },
    };
};
