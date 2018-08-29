function findTransitionIndex (timestamp, timeZone) {
  const { untils } = timeZone
  for (let i = 0, length = untils.length; i < length; ++i) {
    if (timestamp < untils[i]) {
      return i
    }
  }
}

function getTransition (timestamp, timeZone) {
  const transitionIndex = findTransitionIndex(timestamp, timeZone)
  const abbreviation = timeZone.abbreviations[transitionIndex]
  const offset = timeZone.offsets[transitionIndex]
  return { abbreviation, offset }
}

function getTimestamp ({ year, month, day, hours, minutes, seconds = 0, milliseconds = 0 }) {
  return Date.UTC(year, month - 1, day, hours, minutes, seconds, milliseconds)
}

function createUTCTime (timestamp) {
  const date = new Date(timestamp)
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
  const timestamp = getTimestamp(time)
  const { abbreviation, offset } = getTransition(timestamp, timeZone)
  time.zone = { abbreviation, offset }
  return time
}

function changeTimeZone (time, timeZone) {
  const timestamp = getTimestamp(time)
  return createZonedTime(timestamp + time.zone.offset * 60000, timeZone)
}

function createZonedTime (date, timeZone) {
  const timestamp = typeof date === 'number' ? date : getTimestamp(date)
  const { abbreviation, offset } = timeZone ? getTransition(timestamp, timeZone)
    : { abbreviation: 'UTC', offset: 0 }
  const time = createUTCTime(timestamp - offset * 60000)
  const zone = { abbreviation, offset }
  return { ...time, zone }
}

function createDate (time, timeZone) {
  const timestamp = computeUnixTime(time, timeZone)
  return new Date(timestamp)
}

function computeUnixTime (time, timeZone) {
  const timestamp = getTimestamp(time)
  const zone = time.zone || getTransition(timestamp, timeZone)
  return timestamp + zone.offset * 60000
}

export default { setTimeZone, changeTimeZone, createZonedTime, createDate, computeUnixTime }
