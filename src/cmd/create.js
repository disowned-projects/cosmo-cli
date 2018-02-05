const create = require('../scripts/create')

exports.command = 'create <projectPath>'

exports.description = 'Create a new project'

exports.handler = argv => {
  create(argv)
}
