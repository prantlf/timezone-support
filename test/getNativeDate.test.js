/* global it, expect */

const { getNativeDate } = require('../dist/lookup-convert')

it('is exported as a function', () => {
  expect(typeof getNativeDate === 'function').toBeTruthy()
})

it('creates a Date object from a zoned time object', () => {
  const honoluluTime = {
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
  const date = getNativeDate(honoluluTime)
  expect(date.getUTCFullYear()).toEqual(2017)
  expect(date.getUTCMonth()).toEqual(11 - 1)
  expect(date.getUTCDate()).toEqual(15)
  expect(date.getUTCHours()).toEqual(23)
  expect(date.getUTCMinutes()).toEqual(17)
  expect(date.getUTCSeconds()).toEqual(18)
  expect(date.getUTCMilliseconds()).toEqual(234)
})
