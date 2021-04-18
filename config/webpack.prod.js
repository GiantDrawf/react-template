/*
 * @Author: zhujian1995@outlook.com
 * @Date: 2021-04-16 14:36:22
 * @LastEditors: zhujian
 * @LastEditTime: 2021-04-18 17:08:40
 * @Description: 你 kin 你擦
 */
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            unused: true,
            drop_console: true,
            drop_debugger: true,
            dead_code: true,
          },
        },
        parallel: true,
        extractComments: true,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]_[local]',
              },
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]_[local]',
              },
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              //配置选项和插件
              postcssOptions: {
                plugins: [
                  autoprefixer(['last 2 version', '> 1%', 'not ie < 11']),
                  pxtorem({
                    rootValue: 16,
                    unitPrecision: 5,
                    propList: [
                      'font',
                      'font-size',
                      'line-height',
                      'letter-spacing',
                      'width',
                      'height',
                      'margin',
                      'padding',
                    ],
                    selectorBlackList: [],
                    replace: true,
                    mediaQuery: false,
                    minPixelValue: 0,
                    exclude: /node_modules/i,
                  }),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssPlugin({
      filename: '/css/[name].[contenthash:8].css',
      chunkFilename: '/css/[name].[contenthash:8].chunk.css',
    }),
  ],
});
