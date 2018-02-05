const path = require('path')
const fs = require('fs-extra')
const spawn = require('cross-spawn')
const chalk = require('chalk')

const shouldUseYarn = () => {
  const result = spawn.sync('yarnpkg', ['--version'], { stdio: 'ignore' })
  if (result.error) return false
  return true
}

const shiftDevDependencies = (packagePath, devDependencies) => {
  const packageWithDeps = JSON.parse(fs.readFileSync(packagePath).toString())

  packageWithDeps.devDependencies = packageWithDeps.devDependencies || {}

  devDependencies.forEach(dep => {
    const version = packageWithDeps.dependencies[dep]
    delete packageWithDeps.dependencies[dep]
    packageWithDeps.devDependencies[dep] = version
  })

  fs.writeFileSync(packagePath, JSON.stringify(packageWithDeps, null, 2))
}

const installDependencies = (rootDir, dependencies, devDependencies) => {
  const originDir = process.cwd()
  process.chdir(rootDir)

  let installResult
  if (shouldUseYarn()) {
    console.log('Installing dependencies using yarn')
    const args = ['add'].concat(dependencies, devDependencies)
    installResult = spawn.sync('yarnpkg', args, { stdio: 'inherit' })
  } else {
    console.log('Installing dependencies using npm')
    const args = ['install', '--save'].concat(dependencies, devDependencies)
    installResult = spawn.sync('npm', args, { stdio: 'inherit' })
  }

  if (installResult.error || installResult.status !== 0) {
    console.log(chalk.red(`There was some error while trying to install.`))
    installResult.error && console.log(chalk.red(`${installResult.error}`))
    process.exit(1)
  }

  shiftDevDependencies(path.join(rootDir, 'package.json'), devDependencies)

  process.chdir(originDir)
}

module.exports = {
  installDependencies,
  shouldUseYarn,
}
