const format = require('../scripts/format')
const createHandler = require('../utils/createHandler')

exports.command = 'format'

exports.description = 'Format files using Prettier'

exports.builder = yargs =>
  yargs.options({
    f: {
      alias: 'files',
      describe: 'Files to format',
      default: 'src/**/*.js flow-typed/**/*.js',
    },
    n: {
      alias: 'noConfig',
      describe: 'Use prettier without config',
    },
  })

exports.handler = createHandler(argv => {
  const result = format(argv)
  process.exit(result.status)
})
