const createSuite = require('./createSuite')
const { formatZonedTime } = require('../dist/parse-format')

const year = 2018
const month = 9
const day = 1
const hours = 18
const minutes = 1
const seconds = 36
const milliseconds = 386
const zone = { abbreviation: 'CEDT', offset: -120 }
const time = { year, month, day, hours, minutes, seconds, milliseconds, zone }

function formatZonedTimeUsingDate () {
  const date = new Date(year, month, day, hours, minutes, seconds, milliseconds)
  return date.toString()
}

createSuite('Formatting a string with a local time...')
  .add('Date:toString', formatZonedTimeUsingDate)
  .add('formatZonedTime', () => formatZonedTime(time, 'D.M.Y H:MM:ss.SSS Z'))
  .start()
