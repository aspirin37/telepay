const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const fonts = require('./webpack/fonts');
const html = require('./webpack/html');
const babel = require('./webpack/babel');
const media = require('./webpack/media');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const extractAssets = require('./webpack/assets.extract');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PATHS = {
    source: path.resolve(__dirname, 'src'),
    build: path.join(__dirname, 'build'),
    root: path.resolve(__dirname),
};

const common = function (env) {
    console.log(env);
    console.log(process.version);
    return merge([{
        entry: {
            'bundle': path.resolve(__dirname, PATHS.source + '/app/main.js'),
        },
        mode: env.NODE_ENV,
        output: {
            path: PATHS.build,
            publicPath: '/',
            filename: '[name].[hash].js',
        },
        resolve: {
            extensions: ['.js', '.vue'],
            modules: ['node_modules'],
            alias: {
                '@assets': path.resolve(PATHS.source, 'assets'),
                '@modules': path.resolve(PATHS.source, 'app/modules'),
                '@components': path.resolve(PATHS.source, 'app/components'),
                '@services': path.resolve(PATHS.source, 'app/services'),
                '@store': path.resolve(PATHS.source, 'app/store'),
                '@routes': path.resolve(PATHS.source, 'app/routes'),
                '@utils': path.resolve(PATHS.source, 'app/utils'),
                '@mixins': path.resolve(PATHS.source, 'app/mixins'),
                '@filters': path.resolve(PATHS.source, 'app/filters'),
                'vue$': 'vue/dist/vue.esm.js',
            },
        },
        plugins: [
            // new BundleAnalyzerPlugin({ analyzerPort: 5541 }),
            // new webpack.optimize.ModuleConcatenationPlugin(),
            new HtmlWebpackPlugin({
                inject: 'body',
                template: path.resolve(__dirname, PATHS.source + '/app/index.html'),
                minify: {
                    caseSensitive: true,
                    collapseWhitespace: true,
                },
            }),
            new webpack.optimize.SplitChunksPlugin(),
            new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(en|ru)$/), // load only en/ru locale
            new webpack.DefinePlugin({
                'process.env': {
                    url: '\'' + env.url + '\'',
                    NODE_ENV: '\'' + env.NODE_ENV + '\'',
                },
            }),
            new webpack.ProvidePlugin({
                Vue: ['vue/dist/vue.esm.js', 'default'], // WARNING!!! DO NOT DELETE, Vue needs to be imported in almost every component/module
                swal: path.resolve(__dirname, 'src/app/components/swal'),
                moment: 'moment',
            }),
            new CleanWebpackPlugin(['build/bundle*']),
        ],
    },
    images(),
    fonts(),
    html(),
    babel(),
    media(),
    ]);
};

module.exports = function (env) {
    if(env.NODE_ENV === 'production') {
        return merge([
            common(env),
            extractCSS(),
            uglifyJS(),
            extractAssets(PATHS),
        ]);
    }
    if(env.NODE_ENV === 'development') {
        return merge([
            common(env),
            devserver(PATHS, env),
            sass(),
            css(),
        ]);
    }
};
