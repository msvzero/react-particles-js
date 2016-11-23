const webpack = require( 'webpack' );

const plugins = process.env.NODE_ENV == "production" ? 
	[
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
		    debug: false,
		    minimize: true,
		    sourceMap: false,
		    output: {
		        comments: false
		    },
		    compressor: {
		        warnings: false
		    },
		    mangle: false
		}),
		new webpack.DefinePlugin({
		    'process.env': {
		        'NODE_ENV': JSON.stringify( 'production' )
		    }
		})
	] :
	[];

const typescriptLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader!ts-loader'
};

const babelLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
};

const jsonLoader = {
    test: /\.json$/,
    loader: 'json-loader'
};

const loaders = [
    typescriptLoader,
    babelLoader,
    jsonLoader
];

const config = {
    context: __dirname,
    devtool: "eval",
    resolve: {
        extensions: [ "", ".ts", ".tsx", ".js" ]
    },
    entry: {
        index: "./src/index.ts"
    },
    output: {
        path: 'lib',
        filename: "[name].js",
        libraryTarget: 'umd'
    },
    target: 'web',
    module: {
        loaders
    },
    externals: [ "react", "deep-extend" ],
    plugins
};

module.exports = config;