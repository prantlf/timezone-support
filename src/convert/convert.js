import { getUnixTimeFromUTC, getUTCTime, getDateTime } from './utc-date'

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

function attachEpoch (time, unixTime) {
  Object.defineProperty(time, 'epoch', { value: unixTime })
}

function getUTCOffset (date, timeZone) {
  const unixTime = typeof date === 'number' ? date : date.valueOf()
  const { abbreviation, offset } = getTransition(unixTime, timeZone)
  return { abbreviation, offset }
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
  attachEpoch(time, unixTime)
  return time
}

function getUnixTime (time, timeZone) {
  let { zone, epoch } = time
  if (epoch) {
    if (timeZone) {
      throw new Error('Both epoch and other time zone specified. Omit the other one.')
    }
    return epoch
  }
  const unixTime = getUnixTimeFromUTC(time)
  if (zone) {
    if (timeZone) {
      throw new Error('Both own and other time zones specified. Omit the other one.')
    }
  } else {
    if (!timeZone) {
      throw new Error('Missing other time zone.')
    }
    zone = getTransition(unixTime, timeZone)
  }
  return unixTime + zone.offset * 60000
}

function setTimeZone (time, timeZone, options) {
  if (time instanceof Date) {
    time = getDateTime(time, options)
  } else {
    const { year, month, day, hours, minutes, seconds = 0, milliseconds = 0 } = time
    time = { year, month, day, hours, minutes, seconds, milliseconds }
  }
  const unixTime = getUnixTimeFromUTC(time)
  const utcDate = new Date(unixTime)
  time.dayOfWeek = utcDate.getUTCDay()
  const { abbreviation, offset } = getTransition(unixTime, timeZone)
  time.zone = { abbreviation, offset }
  attachEpoch(time, unixTime + offset * 60000)
  return time
}

export { getUTCOffset, getZonedTime, getUnixTime, setTimeZone }
