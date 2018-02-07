const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

const licence = name =>
  `MIT License

Copyright (c) 2018 ${name}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`

const gitignore = `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build
dist/

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# nyc test coverage
.nyc_output

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (http://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Typescript v1 declaration files
typings/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
`

const indexJs = `const add = (x: number, y: number) => x + y

export default add
`

const indexTest = `import add from './'

test('Should add as expected', () => {
  expect(add(5, 5)).toBe(10)
})
`

const readme = (userData, appName) => `# ${appName}

> Description


## Install

\`\`\`
$ npm install --save ${appName}
\`\`\`

## Usage

\`\`\`js
const ${appName} = require('${appName}')
\`\`\`

## License

MIT © ${
  userData.authorUrl
    ? `[${userData.authorName}](${userData.authorUrl})`
    : userData.authorName
}`

const flowConfig = `[include]
src

[ignore]
.*/node_modules/.*
.*.test.js
.*/__tests__/.*
.*/tests/.*
.*/coverage/.*
.*/dist/.*
.*/.vscode/.*

[libs]
flow-typed

[options]
all=true
emoji=true
`

const addFiles = (rootDir, appName, userData) => {
  console.log(`Adding project files`)
  const originDir = process.cwd()
  process.chdir(rootDir)

  fs.ensureFileSync(path.join(rootDir, 'src/index.js'))
  fs.writeFileSync(path.join(rootDir, 'src/index.js'), indexJs)
  fs.writeFileSync(path.join(rootDir, 'src/index.test.js'), indexTest)
  fs.writeFileSync(path.join(rootDir, 'LICENCE'), licence(userData.authorName))
  fs.writeFileSync(path.join(rootDir, '.gitignore'), gitignore)
  fs.writeFileSync(path.join(rootDir, 'readme.md'), readme(userData, appName))
  fs.writeFileSync(path.join(rootDir, '.flowconfig'), flowConfig)
  console.log(chalk.green('✅  Sucessfully Added files'))

  process.chdir(originDir)
}

module.exports = addFiles
