var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
		extensions: ['.webpack.js', '.web.js','.js']
	},
	module: {
		rules: [
			{	test: /\.(js|jsx)?$/,
				exclude: /(node_modules)/,
				use: ['babel-loader'],
				include: [path.join(sourceDir, 'app.jsx'),
							path.join(sourceDir, 'stores'),
							path.join(sourceDir, 'components')]
			},
			{ // loader for all scss, sass, css files excluding foundation
				test: /\.(s?css|sass)$/,
				include: path.join(__dirname, 'styles'),
				exclude: path.join(__dirname, 'styles/foundation'),
				use: [
					'style-loader', 
					'!css-loader!autoprefixer-loader?browsers=last 3 versions',
					'sass-loader',
				]
			},
			//{
			// // loader just for foundation
			// 	test: /\.scss$/,
			// 	include: path.join(__dirname, 'styles/foundation'),
			// 	loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 3 versions!sass'),
			// },
			// {	test: /\.css$/,
			// 	include: path.join(__dirname, 'styles'),
			// 	exclude: path.join(__dirname, 'styles/foundation'),
			// 	loader: "style-loader!css-loader" }
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
	],
	// devServer: {
	// 	proxy: {
	//     	'/api/*': { target: 'http://0.0.0.0:5000/' }
	// 	}
	// }

};
