const merge = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.config.js')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    // new CopyWebpackPlugin([
    //   {
    //     //Note:- No wildcard is specified hence will copy all files and folders
    //     from: 'src/assets/locales', //Will resolve to RepoDir/src/assets
    //     to: 'locales' //Copies all files from above dest to dist/assets
    //   },
    //   {
    //     from: 'src/assets/templates', //Will resolve to RepoDir/src/assets
    //     to: 'templates' //Copies all files from above dest to dist/assets
    //   },
    //   {
    //     from: 'src/assets/favicon.ico', //Will resolve to RepoDir/src/assets
    //     to: 'favicon.ico' //Copies all files from above dest to dist/assets
    //   },
    // ]),
    new webpack.DefinePlugin({
      'process.env': {
        'INSTAGRAM_PROFILE': JSON.stringify('thisisbillgates'),
        'INSTAGRAM_API_URL': JSON.stringify('http://api.backspinn.com/instagram/instagram.ashx?userid='),
      }
    }),
  ],
})