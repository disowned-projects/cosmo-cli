module.exports = data => {
  const packageJson = {
    name: data.name,
    version: '1.0.0',
    main: 'dist/index.js',
    license: 'MIT',
    author: {
      name: data.authorName,
    },
    scripts: {
      build: 'cosmo build',
      test: 'cosmo test',
      start: 'cosmo start',
      format: 'cosmo format',
      lint: 'cosmo lint',
      flow: 'flow',
      flowtyped: 'flow-typed',
      precommit: 'lint-staged',
    },
    'lint-staged': {
      '*.js': ['cosmo format -f', 'cosmo lint -f', 'git add'],
    },
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
