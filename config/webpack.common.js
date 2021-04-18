/*
 * @Author: zhujian1995@outlook.com
 * @Date: 2021-04-16 14:36:05
 * @LastEditors: zhujian
 * @LastEditTime: 2021-04-18 15:25:04
 * @Description: 你 kin 你擦
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
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
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true, importLoaders: 1 },
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
            options: { modules: true, importLoaders: 1 },
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
    new MiniCssPlugin({
      filename: '/css/[name].[contenthash:8].css',
      chunkFilename: '/css/[name].[contenthash:8].chunk.css',
    }),
  ],
};
