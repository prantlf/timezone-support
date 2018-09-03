/* global beforeAll, it, expect */

const { findTimeZone, setTimeZone } = require('../dist/index')

let berlin

function checkTime (time, checkSeconds) {
  const { year, month, day, hours, minutes, seconds, milliseconds, zone, epoch } = time
  expect(year).toEqual(2018)
  expect(month).toEqual(1)
  expect(day).toEqual(2)
  expect(hours).toEqual(10)
  expect(minutes).toEqual(30)
  if (checkSeconds) {
    expect(seconds).toEqual(40)
    expect(milliseconds).toEqual(50)
    expect(epoch).toEqual(1514889040050)
  } else {
    expect(seconds).toEqual(0)
    expect(milliseconds).toEqual(0)
    expect(epoch).toEqual(1514889000000)
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
  const berlinTime = setTimeZone(zonelessTime, berlin)
  checkTime(berlinTime, true)
})

it('supplies zero seconds and milliseconds, if not present in the input', () => {
  const zonelessTime = { year: 2018, month: 1, day: 2, hours: 10, minutes: 30 }
  const berlinTime = setTimeZone(zonelessTime, berlin)
  checkTime(berlinTime, false)
})

it('extracts the time from date parts in the UTC representation', () => {
  const zonelessDate = new Date(Date.UTC(2018, 0, 2, 10, 30))
  const berlinTime = setTimeZone(zonelessDate, berlin, { useUTC: true })
  checkTime(berlinTime, false)
})

it('extracts the time from date parts in the local time zone representation', () => {
  const zonelessDate = new Date(2018, 0, 2, 10, 30)
  const berlinTime = setTimeZone(zonelessDate, berlin, { useUTC: false })
  checkTime(berlinTime, false)
})

it('requests the source of date parts, if a date object uis supplied', () => {
  const zonelessDate = new Date()
  expect(() => setTimeZone(zonelessDate, berlin)).toThrow()
  expect(() => setTimeZone(zonelessDate, berlin, {})).toThrow()
})
