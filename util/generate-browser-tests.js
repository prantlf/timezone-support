const { join } = require('path')
const glob = require('tiny-glob')
const { readFile, outputFile } = require('fs-extra')

const tests = join(__dirname, '../test')

async function readTemplate () {
  console.log(`Reading browser test template...`)
  const template = await readFile(join(tests, 'browser.html'), {encoding: 'utf-8'})
  return template.split('\n')
}

async function readTest (file) {
  console.log(`Reading test ${file}...`)
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
    .concat('', '<script src="../../dist/' + name + '.js"></script>', '',
      '<script>', '(function () {', content, '})()', '</script>')
    .concat(template.slice(contentIndex))
}

(async function () {
  try {
    const template = await readTemplate()
    const scriptIndex = template.indexOf('</head>')
    const files = await glob('*.test.js', {cwd: tests})
    for (let file of files) {
      if (file !== 'browser.test.js') {
        let content = await readTest(file)
        content = formatPage(template, scriptIndex, content)
        console.log(`Writing browser test for ${file}...`)
        file = join(tests, 'browser', file.substr(0, file.length - 2) + 'html')
        await outputFile(file, content.join('\n'))
      }
    }
  } catch (error) {
    console.error(error)
    process.exitCode = 1
  }
})()
