const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	plugins: [
		// new UglifyJSPlugin({
		// 	uglifyOptions: {
		// 		compress: {
		// 			drop_debugger: false
		// 		}
		// 	}
		// })
	]
});
