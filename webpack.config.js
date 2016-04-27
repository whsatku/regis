/* eslint-env node */
'use strict'; // eslint-disable-line strict


let webpack = require('webpack');
let jsloader = ['react-hot', 'babel-loader'];

if(process.env.NODE_ENV === 'production'){
	jsloader = ['babel-loader'];
}

module.exports = {
	entry: __dirname + '/components/main.js',
	output: {
		publicPath: 'js',
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loaders: jsloader },
			{ test: /\.css$/, loader: 'style-loader!css-loader' },
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			},
		}),
	],
};
