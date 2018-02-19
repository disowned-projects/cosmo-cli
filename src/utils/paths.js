const fs = require('fs')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  resolveApp,

  packageJson: require.resolve('../../package.json'),
  localCosmo: resolveApp('node_modules/.bin/cosmo'),
  appDirectory: resolveApp('.'),
  dist: resolveApp('dist'),
  src: resolveApp('src'),
  babelrc: resolveApp('.babelrc'),
  defaultBabelConfig: require.resolve('babel-preset-cosmo'),
  prettierrc: resolveApp('.prettierrc'),
  defaultPrettierConfig: require.resolve('../config/.prettierrc.js'),
  jestConfig: resolveApp('jestConfig.js'),
  defaultJestConfig: require.resolve('../config/jest.js'),
  eslintrc: resolveApp('.eslintrc.js'),
  defaultEslintConfig: require.resolve('eslint-config-cosmo'),
}
