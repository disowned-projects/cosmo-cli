const fullname = require('fullname')
const inquirer = require('inquirer')

const promptData = async (rootDir, appName, skipQuestions) => {
  const name = await fullname()

  if (skipQuestions) {
    return {
      authorName: name,
    }
  }

  const questions = []
  questions.push({
    name: 'description',
    message: 'Description:',
  })
  questions.push({
    name: 'githubUsername',
    message: 'What is your Github username?',
  })
  questions.push({
    name: 'repoUrl',
    message: 'What is your repo URL?',
    default: d =>
      d.githubUsername
        ? `https://github.com/${d.githubUsername}/${appName}`
        : '',
  })
  questions.push({
    name: 'authorName',
    message: 'What is your fullname?',
    default: name,
  })
  questions.push({
    name: 'authorUrl',
    message: 'What is your personal site URL (without https)?',
    validate: url => {
      if (!url) return true
      if (/^(http|https):\/\/+[\www\d]+\.[\w]+(\/[\w\d]+)?/.test(url)) {
        return true
      }
      return `Invalid URL: ${url}`
    },
    filter: url => (url ? `https://${url}` : ''),
  })
  questions.push({
    name: 'authorEmail',
    message: 'What is your email address?',
    validate: email => {
      if (!email) return true
      if (
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        )
      ) {
        return true
      }
      return 'Invalid Email address.'
    },
  })

  const userData = await inquirer.prompt(questions)

  return userData
}

module.exports = promptData
