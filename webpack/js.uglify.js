const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = function() {
  return {
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new UglifyJsPlugin()
    ]
  };
};
