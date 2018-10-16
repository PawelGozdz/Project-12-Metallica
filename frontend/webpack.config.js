const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

// ['babel-polyfill', './src/js/index.js', '../scss/main.scss'],

module.exports = {
  entry: ['./src/assets/js/index.js', './src/assets/scss/main.scss'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'assets/js/script.js'
    // filename: 'js/[name].[chunkhash].js'
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader?url=false', 'postcss-loader', 'sass-loader']
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // outputPath: 'assets/fonts/',
              name: 'assets/fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        exclude: /fonts/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/img/[name].[ext]'
              // name: '~assets/img/[name].[ext]'
            }
          }
        ]
      }
      // {
      //   test: /\.(gif|png|jpe?g|svg)$/i,
      //   exclude: /fonts/,
      //   use: [
      //     'file-loader',
      //     {
      //       loader: 'image-webpack-loader',
      //       options: {
      //         mozjpeg: {
      //           progressive: true,
      //           quality: 65
      //         },
      //          name: '/img/[name].[ext]'
      //         // optipng.enabled: false will disable optipng
      //         optipng: {
      //           enabled: false,
      //         },
      //         pngquant: {
      //           quality: '65-90',
      //           speed: 4
      //         },
      //         gifsicle: {
      //           interlaced: false,
      //         },
      //         // the webp option will enable WEBP
      //         webp: {
      //           quality: 75
      //         }
      //       }
      //     },
      //   ],
      // }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin('dist', {}),
    // new ExtractTextPlugin(
    //   { filename: 'css/style.[hash].css', disable: false, allChunks: true }
    // ),
    new MiniCssExtractPlugin({
      filename: './assets/css/style.css'
      // filename: 'css/style.[contenthash].css'
    }),
    // new HtmlWebpackPlugin({
    //   inject: false,
    //   hash: true,
    //   template: './src/index.html',
    //   filename: 'index.html'
    // })
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/events.html',
      filename: 'events.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/_header.html',
      filename: '_header.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/_footer.html',
      filename: '_footer.html'
    })
    // new WebpackMd5Hash()
  ]
};
