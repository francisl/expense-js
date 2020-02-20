var webpack = require('webpack');
var path = require('path');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const sourceDir = __dirname + "/src";

module.exports = {
  cache: true,
  entry: [
    './src/App.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/app/'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.webpack.js', '.web.js','.js', '.jsx']
  },
  module: {
    rules: [
      {	test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: ['babel-loader'],
      },
      { 
        test: /\.css$/i, 
        use: [
          { 
            loader: MiniCssExtractPlugin.loader, 
            options: {
              esModule: true,
            }
          }, 
          'css-loader'
        ]
      },
    ]
  },
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new AntdDayjsWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'My Expense',
      cache: false,
      template: 'src/index.html'
    })
  ]
};
