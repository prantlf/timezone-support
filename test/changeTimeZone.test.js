/* global it, expect */

const { findTimeZone, changeTimeZone } = require('../dist/index')

it('is exported as a function', () => {
  expect(typeof changeTimeZone === 'function').toBeTruthy()
})

it('converts time in one time zone to another one', () => {
  const londonDate = {
    year: 2018,
    month: 1,
    day: 2,
    hours: 10,
    minutes: 30,
    seconds: 15,
    milliseconds: 234,
    zone: {
      abbreviation: 'GMT',
      offset: 0
    }
  }
  const berlin = findTimeZone('Europe/Berlin')
  const berlinDate = changeTimeZone(londonDate, berlin)
  expect(typeof berlinDate === 'object').toBeTruthy()
  const { year, month, day, hours, minutes, seconds, milliseconds, zone } = berlinDate
  expect(year).toEqual(2018)
  expect(month).toEqual(1)
  expect(day).toEqual(2)
  expect(hours).toEqual(11)
  expect(minutes).toEqual(30)
  expect(seconds).toEqual(15)
  expect(milliseconds).toEqual(234)
  expect(typeof zone === 'object').toBeTruthy()
  expect(zone.abbreviation).toEqual('CET')
  expect(zone.offset).toEqual(-60)
})
