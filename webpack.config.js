var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  devtool: 'eval-source-map',

  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/index'
  ],

  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },

  plugins: [

    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
      '__DEVTOOLS__': process.env.DEVTOOLS === 'true' ? true : false
    }),

    new HtmlWebpackPlugin({
      title: 'antd',
      filename: 'index.html',
      template: 'index.template.html',
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!cssnext-loader'
      },
      {
        test: /\.(jpe?g|png)$/,
        loader: 'url-loader?limit=20000',
      }
    ]
  },
  resolve: {
    extensions: ['', '.js'],
  }
};