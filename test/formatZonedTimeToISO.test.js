/* global it, expect */

const { formatZonedTimeToISO } = require('../dist/index')

it('is exported as a function', () => {
  expect(typeof formatZonedTimeToISO === 'function').toBeTruthy()
})

it('formats a time object to an ISO 8601 string', () => {
  const honoluluDate = {
    year: 2017,
    month: 11,
    day: 15,
    hours: 13,
    minutes: 17,
    seconds: 18,
    milliseconds: 234,
    zone: {
      abbreviation: 'HST',
      offset: 600
    }
  }
  const string = formatZonedTimeToISO(honoluluDate)
  expect(string).toEqual('2017-11-15T23:17:18.234Z')
})
