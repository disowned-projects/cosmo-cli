const create = require('../scripts/create')

exports.command = 'create <projectPath>'

exports.description = 'Create a new project'

exports.builder = yargs =>
  yargs.options({
    s: {
      alias: 'skipQuestions',
      describe: 'Skip questions for user data',
      default: false,
    },
  })

exports.handler = argv => {
  create(argv)
}
