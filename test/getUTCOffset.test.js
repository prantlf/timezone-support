/* global beforeAll, it, expect */

const { findTimeZone, getUTCOffset } = require('../dist/index')

let berlin

beforeAll(() => {
  berlin = findTimeZone('Europe/Berlin')
})

it('is exported as a function', () => {
  expect(typeof getUTCOffset === 'function').toBeTruthy()
})

it('computes the time zone from the UNIX time', () => {
  const unixTime = Date.UTC(2018, 0, 2, 9, 30, 15, 234)
  const zone = getUTCOffset(unixTime, berlin)
  expect(typeof zone === 'object').toBeTruthy()
  expect(zone.abbreviation).toEqual('CET')
  expect(zone.offset).toEqual(-60)
})

it('accepts a Date object instead of a numeric UNIX time', () => {
  const utcDate = new Date(Date.UTC(2018, 6, 2, 9, 30, 15, 234))
  const zone = getUTCOffset(utcDate, berlin)
  expect(typeof zone === 'object').toBeTruthy()
  expect(zone.abbreviation).toEqual('CEST')
  expect(zone.offset).toEqual(-120)
})
