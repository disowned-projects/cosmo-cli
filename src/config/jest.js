const fs = require('fs')
const paths = require('../utils/paths')

const useDefaultConfig = !fs.existsSync(paths.babelrc)

module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  coverageReporters: ['lcov', 'text', 'text-summary'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.js',
    '<rootDir>/src/**/?(*.)(spec|test).js',
  ],
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': useDefaultConfig
      ? require.resolve('./babelTransform.js')
      : require.resolve('babel-jest'),
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  coveragePathIgnorePatterns: ['/__fixtures__/'],
  rootDir: paths.appDirectory,
}
