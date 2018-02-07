const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const validateProjectName = require('validate-npm-package-name')
const spawn = require('cross-spawn')

const packageJsonBuilder = require('./package')
const { installDependencies } = require('./installDependencies')
const addFiles = require('./addFiles')
const promptData = require('./promptData')

const SUPPORTED_NODE_VERSION = 8

const dependencies = ['@babel/runtime']
const devDependencies = ['cosmo-cli', 'flow-bin', 'flow-typed']

const ensureSupportedNodeVersion = () => {
  console.log(`Ensuring node verison is greater than ${SUPPORTED_NODE_VERSION}`)
  const currentVersion = process.version.replace('v', '').split('.')[0]
  if (currentVersion < SUPPORTED_NODE_VERSION) {
    console.log(
      chalk.red(`❌  cosmo requires node version >= ${SUPPORTED_NODE_VERSION}`)
    )
    process.exit(1)
  }
  console.log(chalk.green('✅  Node version verified'))
}

const verifyAppName = async name => {
  console.log(`Checking if ${chalk.green(name)} is a valid package name`)
  if (!validateProjectName(name).validForNewPackages) {
    console.log(chalk.red('❌  Package name invalid'))
    process.exit(1)
  }
  console.log(chalk.green('✅  Package name valid'))
}

const ensureSafeDir = rootDir => {
  console.log(
    'Creating the project directory and ensuring its safe to move forward'
  )
  fs.ensureDirSync(rootDir)
  const contents = fs.readdirSync(rootDir)
  if (contents.length > 0) {
    console.log(
      chalk.red(
        '❌  cosmo requires the new project directory to be empty.',
        'Please ensure that the directory is empty.'
      )
    )
  }
  console.log(chalk.green('✅  Project directory created succesfully'))
}

const initGit = rootDir => {
  const originDir = process.cwd()
  process.chdir(rootDir)

  console.log('Initializing Git')
  const result = spawn.sync('git', ['init'])
  if (result.error || result.status !== 0) {
    console.log(
      chalk.red(`There was some error while trying to initialize git.`)
    )
    result.error && console.log(chalk.red(`${result.error}`))
    process.exit(1)
  }
  console.log(chalk.green('✅  Git initialize successfull'))

  process.chdir(originDir)
}

const createPackageJson = (data, rootDir) => {
  const packageJson = packageJsonBuilder(data)
  console.log('Creating package.json')
  fs.writeFileSync(
    path.join(rootDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  )
  console.log(chalk.green('✅  Sucessfully created package.json'))
}

const create = async argv => {
  const rootDir = path.resolve(argv.projectPath)
  const appName = path.basename(rootDir)

  const userData = await promptData(rootDir, appName)

  const packageJsonData = {
    name: appName,
    ...userData,
  }

  ensureSupportedNodeVersion()
  verifyAppName(appName)
  ensureSafeDir(rootDir)
  initGit(rootDir)
  createPackageJson(packageJsonData, rootDir)
  installDependencies(rootDir, dependencies, devDependencies)
  addFiles(rootDir, appName, userData)
}

module.exports = create
