var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

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
	debug: true,
	resolve: {
		extensions: ['', '.webpack.js', '.web.js','.js']
	},
	module: {
		loaders: [
			{	test: /\.(js|jsx)?$/,
				exclude: /(node_modules)/,
				loaders: ['babel'],
				include: [path.join(sourceDir, 'app.jsx'),
							path.join(sourceDir, 'stores'),
							path.join(sourceDir, 'components')]
			},
			{ // loader for all scss, sass, css files excluding foundation
				test: /\.(s?css|sass)$/,
				include: path.join(__dirname, 'styles'),
				exclude: path.join(__dirname, 'styles/foundation'),
				loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 3 versions!sass')
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
	// path to foundation scss files for correct resolving sass imports
	sassLoader: {
		includePaths: [
			// path.resolve(__dirname, 'node_modules/foundation-sites/scss/'),
		],
	},
	plugins: [
		new ExtractTextPlugin('styles/main.css?[hash]-[chunkhash]-[contenthash]-[name]', {
			disable: false,
			allChunks: true
		})
	],
	// devServer: {
	// 	proxy: {
	//     	'/api/*': { target: 'http://0.0.0.0:5000/' }
	// 	}
	// }

};
