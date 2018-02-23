process.env.BABEL_ENV = 'test'
process.env.NODE_ENV = 'test'

const fs = require('fs')
const jest = require('jest')
const chalk = require('chalk')

const paths = require('../utils/paths')

const useDefaultConfig = !fs.existsSync(paths.jestConfig)

const buildArgs = argv => {
  const args = []
  if (!process.env.CI && !argv.coverage && !argv.noWatch) {
    args.push('--watch')
  }
  if (process.env.CI || argv.ci) {
    args.push('--ci', '--coverage')
  }
  if (argv.notify) {
    args.push('--notify')
  }

  if (useDefaultConfig) {
    args.push('--config', paths.defaultJestConfig)
  } else {
    args.push('--config', paths.jestConfig)
  }

  return args
}

const test = argv => {
  process.on('unhandledRejection', err => {
    console.log(
      chalk.red('You should not have any unhandled rejections in promises')
    )
    console.log(err)
  })

  const args = buildArgs(argv)

  jest.run(args)
}

module.exports = test
