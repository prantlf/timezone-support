/* global beforeAll, it, expect */

const { findTimeZone, setTimeZone } = require('../dist/index')

let berlin

function checkTime ({ year, month, day, hours, minutes, seconds, milliseconds, zone }, checkSeconds) {
  expect(year).toEqual(2018)
  expect(month).toEqual(1)
  expect(day).toEqual(2)
  expect(hours).toEqual(10)
  expect(minutes).toEqual(30)
  if (checkSeconds) {
    expect(seconds).toEqual(40)
    expect(milliseconds).toEqual(50)
  } else {
    expect(seconds).toEqual(0)
    expect(milliseconds).toEqual(0)
  }
  expect(typeof zone === 'object').toBeTruthy()
  expect(zone.abbreviation).toEqual('CET')
  expect(zone.offset).toEqual(-60)
}

beforeAll(() => {
  berlin = findTimeZone('Europe/Berlin')
})

it('is exported as a function', () => {
  expect(typeof setTimeZone === 'function').toBeTruthy()
})

it('sets the right time zone to the time object', () => {
  const zonelessTime = {
    year: 2018, month: 1, day: 2, hours: 10, minutes: 30, seconds: 40, milliseconds: 50
  }
  const berlinTIme = setTimeZone(zonelessTime, berlin)
  checkTime(berlinTIme, true)
})

it('supplies zero seconds and milliseconds, if not present in the input', () => {
  const zonelessTime = { year: 2018, month: 1, day: 2, hours: 10, minutes: 30 }
  const berlinTIme = setTimeZone(zonelessTime, berlin)
  checkTime(berlinTIme, false)
})

it('extracts the time from date parts in the UTC representation', () => {
  const zonelessDate = new Date(Date.UTC(2018, 0, 2, 10, 30))
  const berlinTIme = setTimeZone(zonelessDate, berlin, { useUTC: true })
  checkTime(berlinTIme, false)
})

it('extracts the time from date parts in the local time zone representation', () => {
  const zonelessDate = new Date(2018, 0, 2, 10, 30)
  const berlinTIme = setTimeZone(zonelessDate, berlin, { useUTC: false })
  checkTime(berlinTIme, false)
})

it('requests the source of date parts, if a date object uis supplied', () => {
  const zonelessDate = new Date()
  expect(() => setTimeZone(zonelessDate, berlin)).toThrow()
  expect(() => setTimeZone(zonelessDate, berlin, {})).toThrow()
})
