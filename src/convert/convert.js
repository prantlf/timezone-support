import { getUTCZone } from '../lookup/utc'
import {
  getUnixTimeForUTCTime, getUTCTimeForUnixTime, changeTimeZoneToUTC
} from './utc-convert'

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

function setTimeZone (time, timeZone) {
  const unixTime = getUnixTimeForUTCTime(time)
  const { abbreviation, offset } = getTransition(unixTime, timeZone)
  time.zone = { abbreviation, offset }
  return time
}

function setTimeZoneToUTC (time) {
  time.zone = getUTCZone()
  return time
}

function changeTimeZone (time, timeZone) {
  const unixTime = getUnixTimeForUTCTime(time)
  return getZonedTime(unixTime + time.zone.offset * 60000, timeZone)
}

function getZonedTime (unixTime, timeZone) {
  const { abbreviation, offset } = getTransition(unixTime, timeZone)
  const time = getUTCTimeForUnixTime(unixTime - offset * 60000)
  const zone = { abbreviation, offset }
  return { ...time, zone }
}

function getUTCTime (unixTime) {
  const utcTime = getUTCTimeForUnixTime(unixTime)
  const zone = getUTCZone()
  return { ...utcTime, zone }
}

function getNativeDate (time, timeZone) {
  const unixTime = getUnixTime(time, timeZone)
  return new Date(unixTime)
}

function getUnixTime (time, timeZone) {
  const unixTime = getUnixTimeForUTCTime(time)
  const zone = time.zone || getTransition(unixTime, timeZone)
  return unixTime + zone.offset * 60000
}

export default {
  setTimeZone,
  setTimeZoneToUTC,
  changeTimeZone,
  changeTimeZoneToUTC,
  getZonedTime,
  getUTCTime,
  getNativeDate,
  getUnixTime
}
