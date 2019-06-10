import { findTimeZone, getZonedTime } from 'timezone-support'

function formatTime (date, timeZone) {
  const zonedTime = getZonedTime(date, timeZone)
  const { year, month, day, hours, minutes, seconds } = zonedTime
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

function displayTime (date, timeZone, selector) {
  const formattedTime = formatTime(date, timeZone)
  const element = document.querySelector(selector)
  element.textContent = formattedTime
}

const now = new Date()

const prague = findTimeZone('Europe/Prague')
const toronto = findTimeZone('America/Toronto')

displayTime(now, prague, '#prague')
displayTime(now, toronto, '#toronto')
