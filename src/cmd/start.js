const start = require('../scripts/start')
const createHandler = require('../utils/createHandler')

exports.command = 'start'

exports.description = 'Start the development environment'

exports.handler = createHandler(argv => {
  console.clear()
  start(argv)
})
