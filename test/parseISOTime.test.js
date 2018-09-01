/* global it, expect */

const { parseISOTime } = require('../dist/index')

it('is exported as a function', () => {
  expect(typeof parseISOTime === 'function').toBeTruthy()
})

function checkTime (time) {
  expect(typeof time === 'object').toBeTruthy()
  const { year, month, day, hours, minutes, seconds, milliseconds, zone } = time
  expect(year).toEqual(2017)
  expect(month).toEqual(11)
  expect(day).toEqual(15)
  expect(hours).toEqual(23)
  expect(minutes).toEqual(1)
  expect(seconds).toEqual(18)
  expect(milliseconds).toEqual(234)
  expect(typeof zone === 'object').toBeTruthy()
  expect(zone.abbreviation).toEqual('UTC')
  expect(zone.offset).toEqual(0)
}

it('parses a ISO 8601 string with Z', () => {
  const time = parseISOTime('2017-11-15T23:01:18.234Z')
  checkTime(time)
})

it('parses a ISO 8601 string with zero offset', () => {
  const time = parseISOTime('2017-11-15T23:01:18.234+00:00')
  checkTime(time)
})

it('parses a ISO 8601 string without letters', () => {
  const time = parseISOTime('20171115T230118234Z')
  checkTime(time)
})

it('throws an error for an invalid string', () => {
  expect(() => parseISOTime('A')).toThrow()
})
