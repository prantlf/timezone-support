function getUnixTimeFromUTC ({ year, month, day, hours = 0, minutes = 0, seconds = 0, milliseconds = 0 }) {
  return Date.UTC(year, month - 1, day, hours, minutes, seconds, milliseconds)
}

function getDateFromTime ({ year, month, day, hours = 0, minutes = 0, seconds = 0, milliseconds = 0 }) {
  return new Date(year, month - 1, day, hours, minutes, seconds, milliseconds)
}

function getUTCTime (date) {
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()
  const dayOfWeek = date.getUTCDay()
  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()
  const seconds = date.getUTCSeconds() || 0
  const milliseconds = date.getUTCMilliseconds() || 0
  return { year, month, day, dayOfWeek, hours, minutes, seconds, milliseconds }
}

function getLocalTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dayOfWeek = date.getDay()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds() || 0
  const milliseconds = date.getMilliseconds() || 0
  return { year, month, day, dayOfWeek, hours, minutes, seconds, milliseconds }
}

function getDateTime (date, options) {
  const { useUTC } = options || {}
  let extract
  if (useUTC === true) {
    extract = getUTCTime
  } else if (useUTC === false) {
    extract = getLocalTime
  } else {
    throw new Error('Extract local or UTC date? Set useUTC option.')
  }
  return extract(date)
}

export { getUnixTimeFromUTC, getDateFromTime, getUTCTime, getLocalTime, getDateTime }
