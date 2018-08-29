/* global it, expect */

const { getTimeZone, setTimeZone } = require('../dist/index')

it('is exported as a function', () => {
  expect(typeof setTimeZone === 'function').toBeTruthy()
})

it('sets the right time zone to the time object', () => {
  const berlin = getTimeZone('Europe/Berlin')
  const berlinDate = setTimeZone({
    year: 2018,
    month: 1,
    day: 2,
    hours: 10,
    minutes: 30
  }, berlin)
  const { zone } = berlinDate
  expect(typeof zone === 'object').toBeTruthy()
  expect(zone.abbreviation).toEqual('CET')
  expect(zone.offset).toEqual(-60)
})
