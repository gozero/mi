const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack')

const extractCss = new ExtractTextPlugin({
  filename: '[name].[contenthash]-c.css',
  disable: false
})


const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash]-s.css',
  disable: false // disable设置会覆盖上面的设置
})


module.exports = {
  // entry: {
  //   app: './src/app.js',
  //   vendor: [
  //     'jquery'
  //   ],
  //   polyfill: 'babel-polyfill'

  // },
  // entry: ['babel-polyfill', 'jquery', './src/app.js'],
  devServer: {
    contentBase: './dist',
    // hot: true
  },
  module: {
    rules: [{
      test: require.resolve('jquery'),
      use: [{
        loader: 'expose-loader',
        options: '$'
      }]
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              // useBuiltIns: 'usage',
              // debug: true
            }]
          ]
        }
      }
    }, {
      test: /\.css$/,
      use: extractCss.extract({
        fallback: "style-loader",
        // use: ['css-loader']
        use: [
          { loader: 'css-loader', options: { importLoaders: 1, minimize: true } },
          'postcss-loader'
        ]
      })
    }, {
      test: /\.scss$/,
      use: extractSass.extract({
        // fallback: 'style-loader',
        // use: [
        //   'css-loader',
        //   'sass-loader'
        // ],
        fallback: 'style-loader',
        use: [
          { loader: 'css-loader', options: { importLoaders: 1, minimize: true } },
          'postcss-loader',
          'sass-loader'
        ]
      })
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {
          useRelativePath: true
        }
      }]
    }]
  },
  plugins: [
    extractCss,
    extractSass,
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Mi',
      filename: 'index.html',
      template: 'src/template.html'
    }),
    new webpack.HashedModuleIdsPlugin(),
    // new webpack.HotModuleReplacementPlugin(), // 在开启服务器环境中出现chunkhash的bug
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ['vendor']
    // }), // CommonsChunkPlugin 的 'vendor' 实例，必须在 'runtime' 实例之前引入
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'runtime'
    // }),
    new CopyWebpackPlugin([{
      from: 'src/images/',
      to: path.resolve(__dirname, 'dist/images')
    }]),
  ],
  output: {
    filename: '[name].[chunkhash].js', // '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
