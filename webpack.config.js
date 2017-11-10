var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: './js/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    devServer: {
        port: 8080,
        inline: true,
        hot: true
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'

            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/

            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }


        ]
    },

    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },

    devtool: '#eval-source-map'
}