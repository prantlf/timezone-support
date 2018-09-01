/* global it, expect */

const { setTimeZoneToUTC } = require('../dist')

it('is exported as a function', () => {
  expect(typeof setTimeZoneToUTC === 'function').toBeTruthy()
})

it('sets UTC to the time object', () => {
  const utcTme = setTimeZoneToUTC({
    year: 2018,
    month: 1,
    day: 2,
    hours: 10,
    minutes: 30
  })
  const { zone } = utcTme
  expect(typeof zone === 'object').toBeTruthy()
  expect(zone.abbreviation).toEqual('UTC')
  expect(zone.offset).toEqual(0)
})
