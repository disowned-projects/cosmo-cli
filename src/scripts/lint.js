const fs = require('fs')
const spawn = require('cross-spawn')
const chalk = require('chalk')

const paths = require('../utils/paths')

const useDefaultConfig = !fs.existsSync(paths.eslintrc)

const lint = argv => {
  const args = []
  args.push(argv.f)

  useDefaultConfig
    ? args.push('--config', paths.defaultEslintConfig)
    : console.log(
        chalk.green('Using .eslintrc.js from project root for config')
      )

  const result = spawn.sync(require.resolve('eslint/bin/eslint'), args, {
    stdio: 'inherit',
  })

  if (result.status === 0 && !result.error) {
    console.log(chalk.green('Lint Successfull'))
  }
  if (result.error) {
    console.log(chalk.red('An error has occured'))
    console.log(chalk.red(result.error))
  }

  return result
}

module.exports = lint
