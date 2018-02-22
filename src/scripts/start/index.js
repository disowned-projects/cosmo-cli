process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const path = require('path')
const fs = require('fs')
const nodemon = require('nodemon')
const chalk = require('chalk')
const spawn = require('cross-spawn')
const ON_DEATH = require('death')

const paths = require('../../utils/paths')

const useDefaultConfig = !fs.existsSync(paths.babelrc)

const start = argv => {
  const OFF_DEATH = ON_DEATH((signal, err) => {
    nodemon
      .once('exit', function() {
        process.exit()
      })
      .emit('quit')
  })

  process.on('unhandledRejection', err => {
    console.log(
      chalk.red('You should not have any unhandled rejections in promises')
    )
    OFF_DEATH()
    console.log(err)
  })

  const execWatch = () => {
    const exec = [require.resolve('@babel/node/bin/babel-node')]

    useDefaultConfig
      ? exec.push('--presets', paths.defaultBabelConfig)
      : console.log(chalk.green('Using .babelrc from project root for config'))

    nodemon({
      script: require.resolve('./start'),
      restartable: 'rs',
      ignore: ['.git', 'node_modules/**/node_modules'],
      execMap: {
        js: exec.join(' '),
      },
      watch: [paths.src],
      ext: 'js json',
    })
  }

  const execNoWatch = () => {
    const args = []
    args.push(paths.src)
    useDefaultConfig
      ? args.push('--presets', paths.defaultBabelConfig)
      : console.log(chalk.green('Using .babelrc from project root for config'))

    spawn.sync(require.resolve('@babel/node/bin/babel-node'), args, {
      stdio: 'inherit',
    })
  }

  argv.watch ? execWatch() : execNoWatch()
}

module.exports = start
