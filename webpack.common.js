const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('bundle.css');

// https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/30
// if (module.hot) {
// 	const hotEmitter = require('webpack/hot/emitter');
// 	const DEAD_CSS_TIMEOUT = 2000;
//
// 	hotEmitter.on('webpackHotUpdate', function(currentHash) {
// 		document.querySelectorAll('link[href][rel=stylesheet]').forEach(link => {
// 			const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`);
// 			const newLink = link.cloneNode();
// 			newLink.href = nextStyleHref;
//
// 			link.parentNode.appendChild(newLink);
// 			setTimeout(() => {
// 				link.parentNode.removeChild(link);
// 			}, DEAD_CSS_TIMEOUT);
// 		});
// 	});
// }

module.exports = {
	entry: {
		entry: [
			'./public/javascript/react/packs/index.js',
			'./public/javascript/app.js',
			'./public/javascript/particles.js',
			'./public/stylesheets/app.scss'
		]
	},
	plugins: [
		new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		extractCSS
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
			{
				test: /\.scss$/,
				loader: extractCSS.extract(['css-loader', 'sass-loader'])
			},
			{
				test: /\.(png|jp(e*)g)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 80000, // Convert images < 8kb to base64 strings
							name: 'images/[hash]-[name].[ext]'
						}
					}
				]
			}
		]
	}
};
