const createSuite = require('./createSuite')
const { findTimeZone, getZonedTime } = require('../dist')

const unixTime = new Date(2018, 9, 1, 18, 1, 36, 386).valueOf()
const berlin = findTimeZone('Europe/Berlin')

function getZonedTimeUsingDate () {
  const date = new Date(unixTime)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const milliseconds = date.getMilliseconds()
  const zone = { abbreviation: 'CEST', offset: -120 }
  return { year, month, day, hours, minutes, seconds, milliseconds, zone }
}

createSuite('Converting UTC to a local time...')
  .add('Date:constructor', getZonedTimeUsingDate)
  .add('getZonedTime', () => getZonedTime(unixTime, berlin))
  .start()
