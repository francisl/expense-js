var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const sourceDir = __dirname + "/src";

module.exports = {
	cache: true,
	entry: [
		'./src/app.jsx'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	devtool: 'eval',// 'source-map',
	resolve: {
		extensions: ['.webpack.js', '.web.js','.js', '.jsx']
	},
	module: {
		rules: [
			{	test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: ['babel-loader'],
			},
			{ // loader for all scss, sass, css files excluding foundation
				test: /\.(scss|sass)$/,
				include: path.join(__dirname, 'styles'),
				loader: [
					'style-loader',
					'css-loader!autoprefixer-loader?browsers=last 3 versions',
					'sass-loader',
				]
			},
			{ test: /\.css$/, loader: "style-loader!css-loader" },
		]
	},
	plugins: [
		new ExtractTextPlugin('styles/main.css?[hash]-[chunkhash]-[contenthash]-[name]', {
			disable: false,
			allChunks: true
		}),
		new webpack.LoaderOptionsPlugin({
			debug: true
		}),
		new HtmlWebpackPlugin({
			title: 'My Expense',
			cache: true,
			template: 'src/index.html'
		}),
		// new BundleAnalyzerPlugin(),
	]
};
