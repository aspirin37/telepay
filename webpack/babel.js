module.exports = function() {
    return {
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
            }],
        },
    };
};
