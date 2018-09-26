/* global beforeAll, it, expect */

import { findTimeZone, getZonedTime } from '../src/index'

let berlin

beforeAll(() => {
  berlin = findTimeZone('Europe/Berlin')
})

it('is exported as a function', () => {
  expect(typeof getZonedTime === 'function').toBeTruthy()
})

it('converts the UNIX time to the correct time object', () => {
  const unixTime = Date.UTC(2018, 0, 2, 9, 30, 15, 234)
  const berlinTime = getZonedTime(unixTime, berlin)
  expect(typeof berlinTime === 'object').toBeTruthy()
  const { year, month, day, dayOfWeek, hours, minutes, seconds, milliseconds, zone, epoch } = berlinTime
  expect(year).toEqual(2018)
  expect(month).toEqual(1)
  expect(day).toEqual(2)
  expect(dayOfWeek).toEqual(2)
  expect(hours).toEqual(10)
  expect(minutes).toEqual(30)
  expect(seconds).toEqual(15)
  expect(milliseconds).toEqual(234)
  expect(typeof zone === 'object').toBeTruthy()
  expect(zone.abbreviation).toEqual('CET')
  expect(zone.offset).toEqual(-60)
  expect(epoch).toEqual(1514885415234)
})

it('recognizes daylight-saving time', () => {
  const unixTime = Date.UTC(2018, 6, 2, 9, 30, 15, 234)
  const berlinTime = getZonedTime(unixTime, berlin)
  expect(typeof berlinTime === 'object').toBeTruthy()
  const { year, month, day, dayOfWeek, hours, minutes, seconds, milliseconds, zone, epoch } = berlinTime
  expect(year).toEqual(2018)
  expect(month).toEqual(7)
  expect(day).toEqual(2)
  expect(dayOfWeek).toEqual(1)
  expect(hours).toEqual(11)
  expect(minutes).toEqual(30)
  expect(seconds).toEqual(15)
  expect(milliseconds).toEqual(234)
  expect(typeof zone === 'object').toBeTruthy()
  expect(zone.abbreviation).toEqual('CEST')
  expect(zone.offset).toEqual(-120)
  expect(epoch).toEqual(1530523815234)
})

it('accepts a Date object instead of a numeric UNIX time', () => {
  const utcDate = new Date(Date.UTC(2018, 6, 2, 9, 30, 15, 234))
  const berlinTime = getZonedTime(utcDate, berlin)
  expect(typeof berlinTime === 'object').toBeTruthy()
  const { year, month, day, dayOfWeek, hours, minutes, seconds, milliseconds, zone, epoch } = berlinTime
  expect(year).toEqual(2018)
  expect(month).toEqual(7)
  expect(day).toEqual(2)
  expect(dayOfWeek).toEqual(1)
  expect(hours).toEqual(11)
  expect(minutes).toEqual(30)
  expect(seconds).toEqual(15)
  expect(milliseconds).toEqual(234)
  expect(typeof zone === 'object').toBeTruthy()
  expect(zone.abbreviation).toEqual('CEST')
  expect(zone.offset).toEqual(-120)
  expect(epoch).toEqual(1530523815234)
})

it('optimizes conversion to UTC', () => {
  const utc = findTimeZone('Etc/UTC')
  const utcDate = new Date(Date.UTC(2018, 6, 2, 9, 30, 15, 234))
  const berlinTime = getZonedTime(utcDate, utc)
  expect(typeof berlinTime === 'object').toBeTruthy()
  const { year, month, day, dayOfWeek, hours, minutes, seconds, milliseconds, zone, epoch } = berlinTime
  expect(year).toEqual(2018)
  expect(month).toEqual(7)
  expect(day).toEqual(2)
  expect(dayOfWeek).toEqual(1)
  expect(hours).toEqual(9)
  expect(minutes).toEqual(30)
  expect(seconds).toEqual(15)
  expect(milliseconds).toEqual(234)
  expect(typeof zone === 'object').toBeTruthy()
  expect(zone.abbreviation).toEqual('UTC')
  expect(zone.offset).toEqual(0)
  expect(epoch).toEqual(1530523815234)
})
