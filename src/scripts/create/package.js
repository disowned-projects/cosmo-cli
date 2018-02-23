module.exports = data => {
  const packageJson = {
    name: data.name,
    description: data.description || '',
    version: '1.0.0',
    main: 'dist/index.js',
    license: 'MIT',
    scripts: {
      build: 'cosmo build',
      test: 'cosmo test',
      start: 'cosmo start',
      format: 'cosmo format',
      lint: 'cosmo lint',
      release: 'cosmo release',
      flow: 'flow',
      flowtyped: 'flow-typed',
      precommit: 'lint-staged',
    },
    'lint-staged': {
      '*.js': ['cosmo format -f', 'cosmo lint -f', 'git add'],
    },
    eslintConfig: {
      extends: 'cosmo',
    },
  }

  if (data.authorEmail || data.authorUrl || data.authorName) {
    packageJson.author = {}
  }
  if (data.authorName) {
    packageJson.author.name = data.authorName
  }
  if (data.authorEmail) {
    packageJson.author.email = data.authorEmail
  }
  if (data.authorUrl) {
    packageJson.author.url = data.authorUrl
  }

  if (data.repoUrl) {
    packageJson.repository = data.repoUrl
  }

  return packageJson
}
