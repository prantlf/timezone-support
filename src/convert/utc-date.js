
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

export { getUnixTimeFromUTC, getUTCTime, getLocalTime }
