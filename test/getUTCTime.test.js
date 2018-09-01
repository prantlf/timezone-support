/* global it, expect */

const { getUTCTime } = require('../dist')

it('is exported as a function', () => {
  expect(typeof getUTCTime === 'function').toBeTruthy()
})

it('converts the UNIX time to the correct time object', () => {
  const utcDate = new Date(Date.UTC(2018, 0, 2, 9, 30, 15, 234))
  const utcTime = getUTCTime(utcDate.valueOf())
  expect(typeof utcTime === 'object').toBeTruthy()
  const { year, month, day, hours, minutes, seconds, milliseconds, zone } = utcTime
  expect(year).toEqual(2018)
  expect(month).toEqual(1)
  expect(day).toEqual(2)
  expect(hours).toEqual(9)
  expect(minutes).toEqual(30)
  expect(seconds).toEqual(15)
  expect(milliseconds).toEqual(234)
  expect(typeof zone === 'object').toBeTruthy()
  expect(zone.abbreviation).toEqual('UTC')
  expect(zone.offset).toEqual(0)
})
