/* global it, expect */

const { convertDateToTime } = require('../dist/index')

it('is exported as a function', () => {
  expect(typeof convertDateToTime === 'function').toBeTruthy()
})

it('converts a date to time', () => {
  const date = new Date(2018, 0, 2, 10, 30, 15, 234)
  const time = convertDateToTime(date)
  expect(typeof time === 'object').toBeTruthy()
  const { year, month, day, dayOfWeek, hours, minutes, seconds, milliseconds, epoch, zone } = time
  expect(year).toEqual(2018)
  expect(month).toEqual(1)
  expect(day).toEqual(2)
  expect(dayOfWeek).toEqual(2)
  expect(hours).toEqual(10)
  expect(minutes).toEqual(30)
  expect(seconds).toEqual(15)
  expect(milliseconds).toEqual(234)
  expect(epoch).toEqual(date.valueOf())
  expect(typeof zone === 'object').toBeTruthy()
  const { abbreviation, offset } = zone
  expect(/\w+/.test(abbreviation)).toBeTruthy()
  expect(offset).toEqual(date.getTimezoneOffset())
})
