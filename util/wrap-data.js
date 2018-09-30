const { join } = require('path')
const { readJson, outputFile } = require('fs-extra')

console.log(`Reading packed time zone data source...`)
const data = join(__dirname, './data/packed.json')
readJson(data)
  .then(content => {
    console.log(`Writing full time zone data module...`)
    const module = join(__dirname, '../src/lookup/data.js')
    return outputFile(module, `export default ${JSON.stringify(content, undefined, 2)}`)
  })
  .catch(error => {
    console.error(error)
    process.exitCode = 1
  })
