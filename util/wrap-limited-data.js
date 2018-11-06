const { join } = require('path')
const { readJson, outputFile } = require('fs-extra')
const tz = require('../node_modules/moment-timezone/moment-timezone-utils').tz
const groupLeaders = require('./data/group-leaders.json')

let data, start, end

function prepare2012 () {
  start = 2012
  end = 2022
  return data
}

function prepare1900 () {
  start = 1900
  end = 2050
  return data
}

function readData () {
  console.log(`Reading unpacked time zone data source...`)
  const file = join(__dirname, './data/unpacked.json')
  data = readJson(file)
  return data
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
  .then(prepare2012)
  .then(limitData)
  .then(writeScript)
  .then(prepare1900)
  .then(limitData)
  .then(writeScript)
  .catch(error => {
    console.error(error)
    process.exitCode = 1
  })
