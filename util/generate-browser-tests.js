const { readFile, outputFile } = require('fs-extra')
const { promisify } = require('es6-promisify')
const { join } = require('path')
const glob = require('fast-glob')
let rimraf = require('rimraf')

rimraf = promisify(rimraf)

const tests = join(__dirname, '../test')
const browserTests = join(tests, 'browser')
const importExpression = /import ({[^}]+}) from '..\/src\/([^']+)'/

function readTemplate () {
  console.log(`Reading browser test template...`)
  return readFile(join(tests, 'browser.html'), { encoding: 'utf-8' })
    .then(template => template.split('\n'))
}

function readTest (file) {
  return readFile(join(tests, file), { encoding: 'utf-8' })
    .then(content => {
      content = content.split('\n')
      return content.slice(2, content.length - 1)
    })
}

function formatPage (template, contentIndex, content) {
  const module = content[0]
  const match = importExpression.exec(module)
  if (!match) {
    throw new Error('Statement requiring the code module not found.')
  }
  const name = match[2]
  const variable = name === 'index' ? 'support' : name
  content[0] = module.replace(importExpression, `const $1 = window['timezone-${variable}']`)
  return template.slice(0, contentIndex)
    .concat('', '<script src="../../dist/' + name + '.umd.js"></script>', '',
      '<script>', '(function () {', content, '})()', '</script>')
    .concat(template.slice(contentIndex))
}

console.log(`Deleting existing browser tests...`)
let template
rimraf(browserTests)
  .then(() => readTemplate())
  .then(result => {
    template = result
    return glob('*.test.js', { cwd: tests })
  })
  .then(files => {
    const scriptIndex = template.indexOf('</head>')
    files
      .filter(file => file !== 'browser.test.js')
      .reduce((promise, file) => {
        console.log(`Processing test ${file}...`)
        return promise.then(() =>
          readTest(file)
            .then(content => {
              content = formatPage(template, scriptIndex, content)
              file = join(browserTests, file.substr(0, file.length - 2) + 'html')
              return outputFile(file, content.join('\n'))
            })
        )
      }, Promise.resolve())
  })
  .catch(error => {
    console.error(error)
    process.exitCode = 1
  })
