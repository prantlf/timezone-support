const { readFile, outputFile } = require('fs-extra')
const { promisify } = require('es6-promisify')
const { join } = require('path')
const glob = require('fast-glob')
let rimraf = require('rimraf')

rimraf = promisify(rimraf)

const tests = join(__dirname, '../test')
const browserTests = join(tests, 'browser')
const nonBrowserTests = ['browser.test.js', 'typings.test.js']
const importFunctionsExpression = /import ({[^}]+}) from '..\/src\/([^']+)'/
const importDataExpression = /import (\w+) from '..\/src\/lookup\/([^']+)'/

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

function formatFunctionImport (input) {
  const match = importFunctionsExpression.exec(input)
  if (!match) {
    throw new Error('Statement requiring the code module not found.')
  }
  const name = match[2]
  let variable
  if (name.startsWith('parse-format')) {
    variable = 'ParseFormat'
  } else {
    variable = 'Support'
  }
  const functionCodeLine = input.replace(importFunctionsExpression,
    `const $1 = window.timezone${variable}`)
  const functionScriptElement = [
    '<script src="../../dist/' + name + '.umd.js"></script>'
  ]
  return { functionCodeLine, functionScriptElement }
}

function formatDataImport (input) {
  const match = importDataExpression.exec(input)
  if (!match) {
    return { dataScriptElement: [] }
  }
  const name = match[2]
  const dataCodeLine = input.replace(importDataExpression,
    'const $1 = window.timezoneData')
  const dataScriptElement = [
    '<script src="../../dist/' + name + '.umd.js"></script>'
  ]
  return { dataCodeLine, dataScriptElement }
}

function formatPage (template, contentIndex, content) {
  const { functionCodeLine, functionScriptElement } = formatFunctionImport(content[0])
  content[0] = functionCodeLine
  const { dataCodeLine, dataScriptElement } = formatDataImport(content[1])
  if (dataCodeLine) {
    content[1] = dataCodeLine
  }
  return template.slice(0, contentIndex)
    .concat('')
    .concat(functionScriptElement)
    .concat(dataScriptElement)
    .concat('')
    .concat('<script>', '(function () {', content, '})()', '</script>')
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
      .filter(file => !nonBrowserTests.includes(file))
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
