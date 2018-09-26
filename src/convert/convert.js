import { getUnixTimeFromUTC, getDateFromTime, getUTCTime, getLocalTime, getDateTime } from './utc-date'

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
  const unixTime = typeof date === 'number' ? date : date.getTime()
  const { abbreviation, offset } = getTransition(unixTime, timeZone)
  return { abbreviation, offset }
}

function getZonedTime (date, timeZone) {
  const gotUnixTime = typeof date === 'number'
  const unixTime = gotUnixTime ? date : date.getTime()
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

function convertTimeToDate (time) {
  const { epoch } = time
  if (epoch !== undefined) {
    return new Date(epoch)
  }
  const { offset } = time.zone || {}
  if (offset === undefined) {
    return getDateFromTime(time)
  }
  const unixTime = getUnixTimeFromUTC(time)
  return new Date(unixTime + offset * 60000)
}

function convertDateToTime (date) {
  const time = getLocalTime(date)
  const match = /\(([^)]+)\)$/.exec(date.toTimeString())
  time.zone = {
    abbreviation: match ? match[1]
      // istanbul ignore next
      : '???',
    offset: date.getTimezoneOffset()
  }
  attachEpoch(time, date.getTime())
  return time
}

export { getUTCOffset, getZonedTime, getUnixTime, setTimeZone, convertTimeToDate, convertDateToTime }
