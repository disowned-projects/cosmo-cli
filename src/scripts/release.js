process.env.RELEASE = true

const spawn = require('cross-spawn')
const chalk = require('chalk')

const build = () => spawn.sync('npm', ['run', 'build'], { stdio: 'inherit' })
const push = () =>
  spawn.sync('git', ['push', 'origin', 'master'], { stdio: 'inherit' })

const release = argv => {
  const buildResult = build()
  buildResult.status !== 0 && process.exit(buildResult.status)

  console.log(chalk.green('Starting the release 🚀'))
  console.log()
  const releaseResult = spawn.sync(
    require.resolve('publish-please/bin/publish-please'),
    [],
    {
      stdio: 'inherit',
    }
  )
  if (releaseResult.status !== 0) {
    console.log(chalk.green('Pushing to Github'))
    push()
    console.log('Done 🎉')
  }

  return releaseResult
}

module.exports = release
