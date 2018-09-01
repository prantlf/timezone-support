function getUnixTimeFromUTC ({ year, month, day, hours, minutes, seconds = 0, milliseconds = 0 }) {
  return Date.UTC(year, month - 1, day, hours, minutes, seconds, milliseconds)
}

function getUTCTime (unixTime) {
  const date = new Date(unixTime)
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()
  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()
  const seconds = date.getUTCSeconds()
  const milliseconds = date.getUTCMilliseconds()
  return { year, month, day, hours, minutes, seconds, milliseconds }
}

export { getUnixTimeFromUTC, getUTCTime }
