const paths = require('../utils/paths')

module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  coverageReporters: ['lcov', 'text', 'text-summary'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.js',
    '<rootDir>/src/**/?(*.)(spec|test).js',
  ],
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/__fixtures__/'],
  rootDir: paths.appDirectory,
}
