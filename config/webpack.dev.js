/*
 * @Author: zhujian1995@outlook.com
 * @Date: 2021-04-16 14:36:14
 * @LastEditors: zhujian
 * @LastEditTime: 2021-04-18 14:23:20
 * @Description: 你 kin 你擦
 */
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 5000,
  },
});
