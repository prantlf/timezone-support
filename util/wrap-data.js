const { join } = require('path')
const { readFile, outputFile } = require('fs-extra')

;(async function () {
  try {
    console.log(`Reading time zone data source...`)
    const data = join(__dirname, '../node_modules/moment-timezone/data/packed/latest.json')
    const content = await readFile(data, {encoding: 'utf-8'})
    console.log(`Writing time zone data module...`)
    const module = join(__dirname, '../src/lookup/data.js')
    outputFile(module, `export default ${content}`)
  } catch (error) {
    console.error(error)
    process.exitCode = 1
  }
})()
