/**
 * Created by kgb on 9/12/17.
 */
var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var CompressionPlugin = require('compression-webpack-plugin');
var ip = require('ip');
var config = require('./webpack.base.config.js')

config.devtool = "#eval-source-map"

var myIP = ip.address()
//var ip = 'localhost';

config.entry = {
  Timing_Testbed_Dashboard: [
    'webpack-dev-server/client?http://' + myIP + ':3000',
    'webpack/hot/only-dev-server',
    './ReactJS/Dashboard',
  ],
}

config.output.publicPath = 'http://' + myIP + ':3000' + '/Dashboard/static/bundles/local/'

config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BundleTracker({filename: './webpack-stats-local.json'}),
    new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development'),
      'BASE_API_URL': JSON.stringify('https://'+ myIP +':8000/'),

    }}),
    new webpack.optimize.DedupePlugin(), //dedupe similar code
    new webpack.optimize.UglifyJsPlugin(), //minify everything
    new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
])

config.module.loaders.push(
  { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel'] },
    { test: /\.css$/, loader: "style-loader!css-loader" }
)

module.exports = config
