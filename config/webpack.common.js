/*
 * @Author: zhujian1995@outlook.com
 * @Date: 2021-04-16 14:36:05
 * @LastEditors: zhujian
 * @LastEditTime: 2021-04-18 17:06:29
 * @Description: 你 kin 你擦
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const paths = require('./paths');

module.exports = {
  entry: {
    main: paths.appIndexJs,
  },
  output: {
    path: paths.appBuild,
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].chunk.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js|mjs|jsx|ts|tsx$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
      },
      { test: /\.ttf|woff|woff2|eot|svg|png|jpg|gif$/, use: 'url-loader' },
    ],
  },
  resolve: {
    //省略后缀名
    extensions: ['*', '.js', '.jsx', '.json'],
    // 配置路径别名
    alias: {
      '@assets': path.resolve('./src/assets'),
      '@utils': path.resolve('./src/utils'),
      '@components': path.resolve('./src/components'),
      '@services': path.resolve('./src/services'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'React template',
      template: 'public/index.html',
    }),
  ],
};
