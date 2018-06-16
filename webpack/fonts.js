module.exports = function() {
    return {
        module: {
            rules: [{
                test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/, 
                exclude: [/assets\//],
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                },
            }],
        },
    };
};

