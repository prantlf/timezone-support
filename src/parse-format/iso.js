import { getUTCZone } from '../lookup/utc'
import { changeTimeZoneToUTC } from '../convert/utc-convert'

const isoWithLetters = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3}))?(?:Z|\+00:00)$/
const isoWithoutLetters = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(\d{3})Z$/

function parseUTCTimeFromISO (input) {
  const expression = input.indexOf('-') > 0 ? isoWithLetters : isoWithoutLetters
  const match = expression.exec(input)
  if (match) {
    const year = parseInt(match[1])
    const month = parseInt(match[2])
    const day = parseInt(match[3])
    const hours = parseInt(match[4])
    const minutes = parseInt(match[5])
    const seconds = parseInt(match[6])
    const milliseconds = parseInt(match[7])
    const zone = getUTCZone()
    return { year, month, day, hours, minutes, seconds, milliseconds, zone }
  }
}

function padToTwo (number) {
  return number > 9 ? number : '0' + number
}

function padToThree (number) {
  return number > 99 ? number : number > 9 ? '0' + number : '00' + number
}

function formatZonedTimeToISO (time) {
  let { year, month, day, hours, minutes, seconds, milliseconds } = changeTimeZoneToUTC(time)
  hours = padToTwo(hours)
  minutes = padToTwo(minutes)
  seconds = padToTwo(seconds)
  milliseconds = padToThree(milliseconds)
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`
}

export default { parseUTCTimeFromISO, formatZonedTimeToISO }
