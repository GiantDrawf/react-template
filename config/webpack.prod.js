/*
 * @Author: zhujian1995@outlook.com
 * @Date: 2021-04-16 14:36:22
 * @LastEditors: zhujian
 * @LastEditTime: 2021-04-18 15:18:47
 * @Description: 你 kin 你擦
 */
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
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
});
