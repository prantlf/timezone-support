/* global it, expect */

const { parseZonedTime } = require('../dist/parse-format')

it('is exported as a function', () => {
  expect(typeof parseZonedTime === 'function').toBeTruthy()
})

it('parses a string with no padding needed', () => {
  const time = parseZonedTime('PM 2 18 17 11 3 15 11 2017 HST -10:00', 'A S s m h d D M Y z Z')
  expect(typeof time === 'object').toBeTruthy()
  const { year, month, day, dayOfWeek, hours, minutes, seconds, milliseconds, zone } = time
  expect(year).toEqual(2017)
  expect(month).toEqual(11)
  expect(day).toEqual(15)
  expect(dayOfWeek).toEqual(3)
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
  const time = parseZonedTime('234 13 69 +0000', 'SSS H YY Z')
  expect(typeof time === 'object').toBeTruthy()
  const { year, hours, milliseconds, zone } = time
  expect(year).toEqual(1969)
  expect(hours).toEqual(13)
  expect(milliseconds).toEqual(234)
  expect(typeof zone === 'object').toBeTruthy()
  expect(zone.offset).toEqual(0)
})

it('parses a string with padded numbers, 24-hour mode', () => {
  const time = parseZonedTime('03', 'HH')
  expect(typeof time === 'object').toBeTruthy()
  const { hours } = time
  expect(hours).toEqual(3)
})

it('recognizes midnight', () => {
  const time = parseZonedTime('12 am', 'h a')
  expect(typeof time === 'object').toBeTruthy()
  const { hours } = time
  expect(hours).toEqual(0)
})

it('recognizes noon', () => {
  const time = parseZonedTime('12 pm', 'hh a')
  expect(typeof time === 'object').toBeTruthy()
  const { hours } = time
  expect(hours).toEqual(12)
})

it('format parser caching code works', () => {
  parseZonedTime('2018', 'YYYY')
  const time = parseZonedTime('2018', 'YYYY')
  expect(typeof time === 'object').toBeTruthy()
  const { year } = time
  expect(year).toEqual(2018)
})

it('leaves non-token parts of the format intact', () => {
  const time = parseZonedTime(' S:/-.() SS h ', ' [S]:/-.()[ SS h ]')
  expect(typeof time === 'object').toBeTruthy()
})

it('throws an error for an invalid format', () => {
  expect(() => parseZonedTime('B', 'C')).toThrow()
})

it('throws an error for an unmatched token part', () => {
  expect(() => parseZonedTime('A', 'H')).toThrow()
})

it('throws an error for an unmatched non-token part', () => {
  expect(() => parseZonedTime('B', '[C]')).toThrow()
})

it('throws an error for invalid time zone offset', () => {
  expect(() => parseZonedTime('D', 'Z')).toThrow()
})
