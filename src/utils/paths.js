const fs = require("fs");
const path = require("path");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  resolveApp,

  appDirectory: resolveApp("."),
  dist: resolveApp("dist"),
  src: resolveApp("src"),
  babelrc: resolveApp(".babelrc"),
  defaultBabelConfig: require.resolve("babel-preset-cosmo"),
  prettierrc: resolveApp(".prettierrc"),
  defaultPrettierConfig: require.resolve("../config/.prettierrc.js")
};
