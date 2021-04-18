/*
 * @Author: zhujian1995@outlook.com
 * @Date: 2021-04-18 14:33:32
 * @LastEditors: zhujian
 * @LastEditTime: 2021-04-18 14:41:39
 * @Description: 你 kin 你擦
 */
const fs = require('fs');
const path = require('path');
const url = require('url');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const moduleFileExtensions = ['js', 'ts', 'tsx', 'json', 'jsx'];

const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find((extension) =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

module.exports = {
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appBuild: resolveApp('dist'),
  appSrc: resolveApp('src'),
};
