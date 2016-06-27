var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.conf');

config.entry = config.entry.concat([
    'webpack-dev-server/client?http://0.0.0.0:5000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
]);

config.plugins = config.plugins.concat([
        new webpack.HotModuleReplacementPlugin()
]);

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(5000, '0.0.0.0', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://0.0.0.0:5000/');
});
