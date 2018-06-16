module.exports = function() {
    // noParse: function(content) {
    //     return /assets/.test(content);
    // }
    // noParse: function(path) {
    //     return /assets/.test(path) && !/node_modules\/MY_MODULE/.test(path);
    // }
    return {
        module: {
            rules: [{
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                exclude: [/assets/],
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                },
            }],
        },
    };
};

