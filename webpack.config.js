/* eslint-env node */

module.exports = {
	entry: __dirname + '/components/main.js',
	output: {
		publicPath: 'js',
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader'] },
			{ test: /\.css$/, loader: 'style-loader!css-loader' },
		],
	},
};
