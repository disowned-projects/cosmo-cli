const start = require('../scripts/start')
const createHandler = require('../utils/createHandler')

exports.command = 'start'

exports.description = 'Start the development environment'

exports.builder = yargs =>
  yargs.options({
    w: {
      alias: 'watch',
      describe: 'Watch files for changes',
      default: false,
    },
  })

exports.handler = createHandler(argv => {
  start(argv)
})
