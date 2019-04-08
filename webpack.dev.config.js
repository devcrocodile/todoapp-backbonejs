const merge = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.config.js')
const webpack = require('webpack')

module.exports = merge(common, {
  entry:{
    app:[
      // 'webpack-dev-server/client?http://localhost:8040',
      './src/index.js'
    ]
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    watchContentBase: true,
    historyApiFallback: true,
    stats: 'errors-only',
    open: true,
    port: 8040,
    host: "localhost",
    compress: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'INSTAGRAM_PROFILE': JSON.stringify('anderssmedman'),
        'INSTAGRAM_API_URL': JSON.stringify('http://api.backspinn.com/instagram/instagram.ashx?userid='),
      }
    }),
  ],
})