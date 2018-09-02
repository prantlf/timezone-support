function findTransitionIndex (unixTime, timeZone) {
  const { untils } = timeZone
  for (let i = 0, length = untils.length; i < length; ++i) {
    if (unixTime < untils[i]) {
      return i
    }
  }
}

function getTransition (unixTime, timeZone) {
  const transitionIndex = findTransitionIndex(unixTime, timeZone)
  const abbreviation = timeZone.abbreviations[transitionIndex]
  const offset = timeZone.offsets[transitionIndex]
  return { abbreviation, offset }
}

function getUnixTimeFromUTC ({ year, month, day, hours, minutes, seconds = 0, milliseconds = 0 }) {
  return Date.UTC(year, month - 1, day, hours, minutes, seconds, milliseconds)
}

function getUTCTime (date) {
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()
  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()
  const seconds = date.getUTCSeconds()
  const milliseconds = date.getUTCMilliseconds()
  return { year, month, day, hours, minutes, seconds, milliseconds }
}

function setTimeZone (time, timeZone) {
  const unixTime = getUnixTimeFromUTC(time)
  const { abbreviation, offset } = getTransition(unixTime, timeZone)
  time.zone = { abbreviation, offset }
  return time
}

function getZonedTime (date, timeZone) {
  const gotUnixTime = typeof date === 'number'
  const unixTime = gotUnixTime ? date : date.valueOf()
  const { abbreviation, offset } = getTransition(unixTime, timeZone)
  if (gotUnixTime || offset) {
    date = new Date(unixTime - offset * 60000)
  }
  const time = getUTCTime(date)
  time.zone = { abbreviation, offset }
  return time
}

function getUnixTime (time, timeZone) {
  const unixTime = getUnixTimeFromUTC(time)
  const zone = time.zone || getTransition(unixTime, timeZone)
  return unixTime + zone.offset * 60000
}

export { setTimeZone, getZonedTime, getUnixTime }
