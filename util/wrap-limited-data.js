const { join } = require('path')
const { readJson, outputFile } = require('fs-extra')
const tz = require('../node_modules/moment-timezone/moment-timezone-utils').tz
const groupLeaders = require('./data/group-leaders.json')

const start = 2012
const end = 2022

function readData () {
  console.log(`Reading unpacked time zone data source...`)
  const file = join(__dirname, './data/unpacked.json')
  return readJson(file)
}

function limitData (data) {
  return tz.filterLinkPack(data, start, end, groupLeaders)
}

function writeScript (data) {
  console.log(`Writing limited time zone data module...`)
  const module = join(__dirname, `../src/lookup/data-${start}-${end}.js`)
  return outputFile(module, `export default ${JSON.stringify(data, undefined, 2)}`)
}

readData()
  .then(limitData)
  .then(writeScript)
  .catch(error => {
    console.error(error)
    process.exitCode = 1
  })
