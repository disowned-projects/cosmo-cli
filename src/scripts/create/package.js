module.exports = data => ({
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
  },
})
