/* global it, expect */

const { parseZonedTime } = require('../dist/parse-format')

it('is exported as a function', () => {
  expect(typeof parseZonedTime === 'function').toBeTruthy()
})

it('parses a string with no padding needed', () => {
  const time = parseZonedTime('PM 2 18 17 11 15 11 2017 HST -10:00', 'A S s m h D M Y z Z')
  expect(typeof time === 'object').toBeTruthy()
  const { year, month, day, hours, minutes, seconds, milliseconds, zone } = time
  expect(year).toEqual(2017)
  expect(month).toEqual(11)
  expect(day).toEqual(15)
  expect(hours).toEqual(23)
  expect(minutes).toEqual(17)
  expect(seconds).toEqual(18)
  expect(milliseconds).toEqual(200)
  expect(typeof zone === 'object').toBeTruthy()
  expect(zone.abbreviation).toEqual('HST')
  expect(zone.offset).toEqual(600)
})

it('parses a string with padded numbers', () => {
  const time = parseZonedTime('AM 03 08 07 01 05 01 07 +0100', 'A SS ss mm hh DD MM YY ZZ')
  expect(typeof time === 'object').toBeTruthy()
  const { year, month, day, hours, minutes, seconds, milliseconds, zone } = time
  expect(year).toEqual(2007)
  expect(month).toEqual(1)
  expect(day).toEqual(5)
  expect(hours).toEqual(1)
  expect(minutes).toEqual(7)
  expect(seconds).toEqual(8)
  expect(milliseconds).toEqual(30)
  expect(typeof zone === 'object').toBeTruthy()
  expect(zone.offset).toEqual(-60)
})

it('parses a string with with no padding needed, 24-hour mode', () => {
  const time = parseZonedTime('234 13 2018', 'SSS H YYYY')
  expect(typeof time === 'object').toBeTruthy()
  const { year, hours, milliseconds } = time
  expect(year).toEqual(2018)
  expect(hours).toEqual(13)
  expect(milliseconds).toEqual(234)
})

it('parses a string with padded numbers, 24-hour mode', () => {
  const time = parseZonedTime('03', 'HH')
  expect(typeof time === 'object').toBeTruthy()
  const { hours } = time
  expect(hours).toEqual(3)
})

it('recognizes midnight', () => {
  const time = parseZonedTime('12 AM', 'h A')
  expect(typeof time === 'object').toBeTruthy()
  const { hours } = time
  expect(hours).toEqual(0)
})

it('leaves non-token parts of the format intact', () => {
  const time = parseZonedTime(' S:/-.() SS h ', ' [S]:/-.()[ SS h ]')
  expect(typeof time === 'object').toBeTruthy()
})
