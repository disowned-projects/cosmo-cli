const build = require('../scripts/build')

exports.command = 'build'

exports.description = 'Build the project'

exports.handler = argv => {
  const result = build(argv)
  process.exit(result.status)
}
