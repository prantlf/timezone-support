const createSuite = require('./createSuite')
const { findTimeZone, getZonedTime } = require('../dist')

const utc = findTimeZone('Etc/UTC')
const input = '2018-09-01T18:01:36.386Z'

function parseISOTimeUsingDate () {
  const date = new Date(input)
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()
  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()
  const seconds = date.getUTCSeconds()
  const milliseconds = date.getUTCMilliseconds()
  const zone = { abbreviation: 'UTC', offset: 0 }
  return { year, month, day, hours, minutes, seconds, milliseconds, zone }
}

function parseISOTimeUsingDateValue () {
  const date = new Date(input)
  getZonedTime(date, utc)
}

createSuite('Parsing an ISO 8601 string...')
  .add('Date:constructor', parseISOTimeUsingDate)
  .add('Date:constructor + getZonedTime', parseISOTimeUsingDateValue)
  .start()
