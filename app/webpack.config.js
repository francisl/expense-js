var webpack = require('webpack');
var path = require('path');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const sourceDir = __dirname + "/src";

 const config = {
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
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx','.js', '.jsx'],
    alias: {
      "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js")
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {	test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: ['babel-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          //'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          'sass-loader',
        ],
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

module.exports = config