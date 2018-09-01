import { getUnixTimeForUTCTime, getUTCTimeForUnixTime } from '../convert/utc-convert'

const isoWithLetters = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(?:\.(\d{3}))?(?:Z|\+00:00)$/
const isoWithoutLetters = /^(\d{4})(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)(\d{3})Z$/

function parseISOTime (input) {
  const expression = input.indexOf('-') > 0 ? isoWithLetters : isoWithoutLetters
  const match = expression.exec(input)
  if (!match) {
    throw new Error(`Invalid ISO 8601 time: "${input}".`)
  }
  const year = parseInt(match[1])
  const month = parseInt(match[2])
  const day = parseInt(match[3])
  const hours = parseInt(match[4])
  const minutes = parseInt(match[5])
  const seconds = parseInt(match[6])
  const milliseconds = parseInt(match[7])
  const zone = { abbreviation: 'UTC', offset: 0 }
  return { year, month, day, hours, minutes, seconds, milliseconds, zone }
}

function changeToUTC (time) {
  const unixTime = getUnixTimeForUTCTime(time)
  return getUTCTimeForUnixTime(unixTime + time.zone.offset * 60000)
}

function padToTwo (number) {
  return number > 9 ? number : '0' + number
}

function padToThree (number) {
  return number > 99 ? number : number > 9 ? '0' + number : '00' + number
}

function formatISOTime (time) {
  let { year, month, day, hours, minutes, seconds, milliseconds } = changeToUTC(time)
  hours = padToTwo(hours)
  minutes = padToTwo(minutes)
  seconds = padToTwo(seconds)
  milliseconds = padToThree(milliseconds)
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`
}

export { parseISOTime, formatISOTime }
