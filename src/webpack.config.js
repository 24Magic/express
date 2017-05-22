var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')

module.exports = {
    entry: path.join(__dirname, 'js/app/index.js'),
    output: {
        path: path.join(__dirname, '../public/javascripts'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [ 
	        {
	            test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
	            // use: ExtractTextPlugin.extract({
             //        fallback: 'style-loader',
             //        user: ['css-loader', 'less-loader', 'postcss-loader']
             //    }) //抽离出一个css文件
	        }
        ]
    },
    resolve: {
        alias: {
            jquery: path.join(__dirname, 'js/lib/jquery-3.2.0.min.js'),
            mod: path.join(__dirname, 'js/mod'),
            less: path.join(__dirname, 'less')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        // new ExtractTextPlugin('css/index.css'),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        })
    ]
}