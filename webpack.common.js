const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('bundle.css');

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
		new CleanWebpackPlugin([path.resolve(__dirname, 'public', 'dist')]),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		extractCSS
	],
	output: {
		path: path.resolve(__dirname, 'public', 'dist'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
			{
				test: /\.scss$/,
				loader: extractCSS.extract(['css-loader', 'sass-loader'])
			}
		]
	}
};
