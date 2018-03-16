const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// const express = require('express');
// const path = require('path');

module.exports = merge(common, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './app/views/',
		hot: true
		// setup(app) {
		// 	app.use(
		// 		'/public/stylesheets/',
		// 		express.static(path.join(__dirname, 'public', 'stylesheets'))
		// 	);
		// }
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	}
});
