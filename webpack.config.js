module.exports = {
	entry: 'components/main.js',
	output: {
		publicPath: 'js',
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{
				test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader',
			},
		],
	},
};
