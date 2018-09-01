/* global it, expect */

const { parseUTCTimeFromISO } = require('../dist/index')

it('is exported as a function', () => {
  expect(typeof parseUTCTimeFromISO === 'function').toBeTruthy()
})

function checkTime (time) {
  expect(typeof time === 'object').toBeTruthy()
  const { year, month, day, hours, minutes, seconds, milliseconds, zone } = time
  expect(year).toEqual(2017)
  expect(month).toEqual(11)
  expect(day).toEqual(15)
  expect(hours).toEqual(23)
  expect(minutes).toEqual(17)
  expect(seconds).toEqual(18)
  expect(milliseconds).toEqual(234)
  expect(typeof zone === 'object').toBeTruthy()
  expect(zone.abbreviation).toEqual('UTC')
  expect(zone.offset).toEqual(0)
}

it('parses a ISO 8601 string with Z', () => {
  const time = parseUTCTimeFromISO('2017-11-15T23:17:18.234Z')
  checkTime(time)
})

it('parses a ISO 8601 string with zero offset', () => {
  const time = parseUTCTimeFromISO('2017-11-15T23:17:18.234+00:00')
  checkTime(time)
})

it('parses a ISO 8601 string without letters', () => {
  const time = parseUTCTimeFromISO('20171115T231718234Z')
  checkTime(time)
})
