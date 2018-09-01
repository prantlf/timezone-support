const createSuite = require('./createSuite')
const { getUnixTime, formatISOTime } = require('../dist')

const year = 2018
const month = 9
const day = 1
const hours = 18
const minutes = 1
const seconds = 36
const milliseconds = 386
const zone = { abbreviation: 'CEDT', offset: -120 }
const time = { year, month, day, hours, minutes, seconds, milliseconds, zone }

function formatISOTimeUsingDate () {
  const date = new Date(year, month, day, hours, minutes, seconds, milliseconds)
  return date.toISOString()
}

function formatISOTimeUsingUnixTime () {
  const unixTime = getUnixTime(time)
  const date = new Date(unixTime)
  return date.toISOString()
}

createSuite('Formatting an ISO 8601 string...')
  .add('Date:toISOString', formatISOTimeUsingDate)
  .add('formatISOTime', () => formatISOTime(time))
  .add('getUnixTime + Date:toISOString', formatISOTimeUsingUnixTime)
  .start()
