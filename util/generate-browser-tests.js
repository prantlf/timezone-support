const { readFile, outputFile } = require('fs-extra')
const { promisify } = require('util')
const { join } = require('path')
const glob = require('tiny-glob')
let rimraf = require('rimraf')

rimraf = promisify(rimraf)

const tests = join(__dirname, '../test')
const browserTests = join(tests, 'browser')

async function readTemplate () {
  console.log(`Reading browser test template...`)
  const template = await readFile(join(tests, 'browser.html'), {encoding: 'utf-8'})
  return template.split('\n')
}

async function readTest (file) {
  let content = await readFile(join(tests, file), {encoding: 'utf-8'})
  content = content.split('\n')
  return content.slice(2, content.length - 1)
}

function formatPage (template, contentIndex, content) {
  const module = content[0]
  const match = /require\('..\/dist\/([^']+)'\)/.exec(module)
  if (!match) {
    throw new Error('Statement requiring the code module not found.')
  }
  const name = match[1]
  const variable = name === 'index' ? 'support' : name
  content[0] = module.replace(/require\('..\/dist\/[^']+'\)/, 'window[\'timezone-' + variable + '\']')
  return template.slice(0, contentIndex)
    .concat('', '<script src="../../dist/' + name + '.umd.js"></script>', '',
      '<script>', '(function () {', content, '})()', '</script>')
    .concat(template.slice(contentIndex))
}

(async function () {
  try {
    console.log(`Deleting existing browser tests...`)
    await rimraf(browserTests)
    const template = await readTemplate()
    const scriptIndex = template.indexOf('</head>')
    const files = await glob('*.test.js', {cwd: tests})
    for (let file of files) {
      if (file !== 'browser.test.js') {
        console.log(`Processing test ${file}...`)
        let content = await readTest(file)
        content = formatPage(template, scriptIndex, content)
        file = join(browserTests, file.substr(0, file.length - 2) + 'html')
        await outputFile(file, content.join('\n'))
      }
    }
  } catch (error) {
    console.error(error)
    process.exitCode = 1
  }
})()
