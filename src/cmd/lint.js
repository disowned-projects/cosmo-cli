const lint = require('../scripts/lint')
const createHandler = require('../utils/createHandler')

exports.command = 'lint'

exports.description = 'Code analysis using Eslint'

exports.builder = yargs =>
  yargs.options({
    f: {
      alias: 'files',
      describe: 'Files to lint',
      default: 'src/',
    },
  })

exports.handler = createHandler(argv => {
  const result = lint(argv)
  process.exit(result.status)
})
