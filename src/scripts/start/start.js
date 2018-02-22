const chalk = require('chalk')

const paths = require('../../utils/paths')

console.clear()
console.log(chalk.green('------ Development Console ------'))
require(paths.resolveApp('src'))
