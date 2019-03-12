var path = require("path")
var webpack = require('webpack')

module.exports = {
  context: __dirname,

  entry: {
    // Add as many entry points as you have container-react-components here
    Dashboard: './ReactJS/Dashboard',
    Timing_Testbed_Dashboard: ['react'],
  },

  output: {
      path: path.resolve('./Dashboard/static/bundles/local/'),
      filename: "[name]-[hash].js"
  },

  externals: [
  ], // add all vendor libs

  plugins: [

      new webpack.optimize.CommonsChunkPlugin('Timing_Testbed_Dashboard', 'Timing_Testbed_Dashboard.js'),
      new webpack.ProvidePlugin({ 'jQuery': 'jquery', '$': 'jquery',})
  ], // add all common plugins here

  module: {
    loaders: [] // add all common loaders here
  },

  resolve: {

    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  },
}/**
 * Created by kgb on 9/12/17.
 */
