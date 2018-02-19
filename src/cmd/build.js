const build = require('../scripts/build')
const createHandler = require('../utils/createHandler')

exports.command = 'build'

exports.description = 'Build the project'

exports.handler = createHandler(argv => {
  const result = build(argv)
  process.exit(result.status)
})
