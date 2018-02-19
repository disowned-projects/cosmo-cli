// We use this function to create handlers so that all the commands are aware
// to use to local version of the CLI if available.

const fs = require('fs-extra')
const spawn = require('cross-spawn')
const chalk = require('chalk')

const paths = require('../utils/paths')

const createHandler = (
  fn,
  shouldUseLocalCli = fs.existsSync(paths.localCosmo)
) => {
  // If we are not using the local cli and we are asked to use it,
  // we call the command on local cli.
  if (shouldUseLocalCli && process.argv[1] !== paths.localCosmo) {
    return () => {
      console.log(chalk.green('Using local project CLI'))
      const args = process.argv.slice(2)
      const result = spawn.sync(paths.localCosmo, args, { stdio: 'inherit' })
      process.exit(result.status)
    }
  }

  return fn
}

module.exports = createHandler
