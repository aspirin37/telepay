const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function(paths) {
  return {
    plugins: [
      new CopyWebpackPlugin([
        {from: path.resolve(paths.root, 'src/assets'), to: path.resolve(paths.build, 'assets')},
      ]),
    ],
  };
};
