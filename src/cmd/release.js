const release = require('../scripts/release')
const createHandler = require('../utils/createHandler')

exports.command = 'release'

exports.description = 'Release to npm'

exports.handler = createHandler(argv => {
  const result = release(argv)
  process.exit(result.status)
})
