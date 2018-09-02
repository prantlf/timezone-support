/* global beforeAll, it, expect */

const { findTimeZone, getZonedTime } = require('../dist/index')

let berlin

beforeAll(() => {
  berlin = findTimeZone('Europe/Berlin')
})

it('is exported as a function', () => {
  expect(typeof getZonedTime === 'function').toBeTruthy()
})

it('converts the UNIX time to the correct time object', () => {
  const utcDate = new Date(Date.UTC(2018, 0, 2, 9, 30, 15, 234))
  const berlinDate = getZonedTime(utcDate.valueOf(), berlin)
  expect(typeof berlinDate === 'object').toBeTruthy()
  const { year, month, day, hours, minutes, seconds, milliseconds, zone } = berlinDate
  expect(year).toEqual(2018)
  expect(month).toEqual(1)
  expect(day).toEqual(2)
  expect(hours).toEqual(10)
  expect(minutes).toEqual(30)
  expect(seconds).toEqual(15)
  expect(milliseconds).toEqual(234)
  expect(typeof zone === 'object').toBeTruthy()
  expect(zone.abbreviation).toEqual('CET')
  expect(zone.offset).toEqual(-60)
})

it('recognizes daylight-saving time', () => {
  const utcDate = new Date(Date.UTC(2018, 6, 2, 9, 30, 15, 234))
  const berlinDate = getZonedTime(utcDate.valueOf(), berlin)
  expect(typeof berlinDate === 'object').toBeTruthy()
  const { year, month, day, hours, minutes, seconds, milliseconds, zone } = berlinDate
  expect(year).toEqual(2018)
  expect(month).toEqual(7)
  expect(day).toEqual(2)
  expect(hours).toEqual(11)
  expect(minutes).toEqual(30)
  expect(seconds).toEqual(15)
  expect(milliseconds).toEqual(234)
  expect(typeof zone === 'object').toBeTruthy()
  expect(zone.abbreviation).toEqual('CEST')
  expect(zone.offset).toEqual(-120)
})

it('accepts a Date object instead of a numeric UNIX time', () => {
  const utcDate = new Date(Date.UTC(2018, 6, 2, 9, 30, 15, 234))
  const berlinDate = getZonedTime(utcDate, berlin)
  expect(typeof berlinDate === 'object').toBeTruthy()
  const { year, month, day, hours, minutes, seconds, milliseconds, zone } = berlinDate
  expect(year).toEqual(2018)
  expect(month).toEqual(7)
  expect(day).toEqual(2)
  expect(hours).toEqual(11)
  expect(minutes).toEqual(30)
  expect(seconds).toEqual(15)
  expect(milliseconds).toEqual(234)
  expect(typeof zone === 'object').toBeTruthy()
  expect(zone.abbreviation).toEqual('CEST')
  expect(zone.offset).toEqual(-120)
})

it('optimizes conversion to UTC', () => {
  const utc = findTimeZone('Etc/UTC')
  const utcDate = new Date(Date.UTC(2018, 6, 2, 9, 30, 15, 234))
  const berlinDate = getZonedTime(utcDate, utc)
  expect(typeof berlinDate === 'object').toBeTruthy()
  const { year, month, day, hours, minutes, seconds, milliseconds, zone } = berlinDate
  expect(year).toEqual(2018)
  expect(month).toEqual(7)
  expect(day).toEqual(2)
  expect(hours).toEqual(9)
  expect(minutes).toEqual(30)
  expect(seconds).toEqual(15)
  expect(milliseconds).toEqual(234)
  expect(typeof zone === 'object').toBeTruthy()
  expect(zone.abbreviation).toEqual('UTC')
  expect(zone.offset).toEqual(0)
})
