const { join } = require('path')
const { readJson, outputFile } = require('fs-extra')

;(async function () {
  try {
    console.log(`Reading time zone data source...`)
    const data = join(__dirname, '../node_modules/moment-timezone/data/packed/latest.json')
    const content = await readJson(data)
    console.log(`Writing time zone data module...`)
    const module = join(__dirname, '../src/lookup/data.js')
    outputFile(module, `export default ${JSON.stringify(content)}`)
  } catch (error) {
    console.error(error)
    process.exitCode = 1
  }
})()
