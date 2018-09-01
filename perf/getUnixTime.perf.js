const createSuite = require('./createSuite')
const { getUnixTime } = require('../dist')

const year = 2018
const month = 9
const day = 1
const hours = 18
const minutes = 1
const seconds = 36
const milliseconds = 386
const zone = { abbreviation: 'CEDT', offset: -120 }
const time = { year, month, day, hours, minutes, seconds, milliseconds, zone }

function getUnixTimeUsingDate () {
  const date = new Date(year, month, day, hours, minutes, seconds, milliseconds)
  return date.getTime()
}

createSuite('Converting a local time to UTC...')
  .add('Date:getTimestamp', getUnixTimeUsingDate)
  .add('getUnixTime', () => getUnixTime(time))
  .start()
