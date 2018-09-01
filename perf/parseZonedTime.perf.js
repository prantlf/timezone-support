const createSuite = require('./createSuite')
const { parseZonedTime } = require('../dist/parse-format')

const nativeInput = new Date('2018-09-01T18:01:36.386Z').toString()
const localInput = '1.9.2018 18:01:36.386 +02:00'

function parseZonedTimeUsingDate () {
  const date = new Date(nativeInput)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const milliseconds = date.getMilliseconds()
  const zone = { abbreviation: 'CEDT', offset: -120 }
  return { year, month, day, hours, minutes, seconds, milliseconds, zone }
}

createSuite('Parsing a string with a local time...')
  .add('Date:constructor', parseZonedTimeUsingDate)
  .add('parseZonedTime', () => parseZonedTime(localInput, 'D.M.Y H:MM:ss.SSS Z'))
  .start()
