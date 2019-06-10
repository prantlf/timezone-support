import { findTimeZone, getZonedTime } from 'timezone-support'

function formatTime (date, timeZone) {
  const zonedTime = getZonedTime(date, timeZone)
  const { year, month, day, hours, minutes, seconds } = zonedTime
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

function displayTime (date, timeZone) {
  const formattedTime = formatTime(date, timeZone)
  console.log(formattedTime)
}

const now = new Date()

const prague = findTimeZone('Europe/Prague')
const toronto = findTimeZone('America/Toronto')

displayTime(now, prague)
displayTime(now, toronto)
