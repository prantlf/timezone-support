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
  const seconds = date.getUTCSeconds() || 0
  const milliseconds = date.getUTCMilliseconds() || 0
  return { year, month, day, hours, minutes, seconds, milliseconds }
}

function getLocalTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const milliseconds = date.getMilliseconds()
  return { year, month, day, hours, minutes, seconds, milliseconds }
}

function setTimeZone (time, timeZone, options) {
  if (time instanceof Date) {
    const { useUTC } = options || {}
    let extract
    if (useUTC === true) {
      extract = getUTCTime
    } else if (useUTC === false) {
      extract = getLocalTime
    } else {
      throw new Error('Source of the date parts missing.')
    }
    time = extract(time)
  }
  const unixTime = getUnixTimeFromUTC(time)
  const { abbreviation, offset } = getTransition(unixTime, timeZone)
  const zone = { abbreviation, offset }
  const { year, month, day, hours, minutes, seconds = 0, milliseconds = 0 } = time
  return { year, month, day, hours, minutes, seconds, milliseconds, zone }
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
  let { zone } = time
  if (zone) {
    if (timeZone) {
      throw new Error('Two time zones specified.')
    }
  } else {
    zone = getTransition(unixTime, timeZone)
  }
  return unixTime + zone.offset * 60000
}

export { setTimeZone, getZonedTime, getUnixTime }
