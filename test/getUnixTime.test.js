/* global beforeAll, it, expect */

import { findTimeZone, getUnixTime } from '../src/index'

let berlin

beforeAll(() => {
  berlin = findTimeZone('Europe/Berlin')
})

it('is exported as a function', () => {
  expect(typeof getUnixTime === 'function').toBeTruthy()
})

it('converts the time object to the correct UNIX time', () => {
  const berlinTime = {
    year: 2018,
    month: 1,
    day: 2,
    hours: 10,
    minutes: 30,
    seconds: 15,
    milliseconds: 234,
    zone: {
      abbreviation: 'CET',
      offset: -60
    }
  }
  const unixTime = getUnixTime(berlinTime)
  expect(typeof unixTime === 'number').toBeTruthy()
  const epoch = Date.UTC(2018, 0, 2, 9, 30, 15, 234)
  expect(unixTime).toEqual(epoch)
})

it('accepts an explicit time zone as a parameter', () => {
  const berlinTime = {
    year: 2018,
    month: 1,
    day: 2,
    hours: 10,
    minutes: 30,
    seconds: 15,
    milliseconds: 234
  }
  const unixTime = getUnixTime(berlinTime, berlin)
  expect(typeof unixTime === 'number').toBeTruthy()
  const epoch = Date.UTC(2018, 0, 2, 9, 30, 15, 234)
  expect(unixTime).toEqual(epoch)
})

it('seconds and milliseconds are optional in the time object', () => {
  const berlinTime = {
    year: 2018,
    month: 1,
    day: 2,
    hours: 10,
    minutes: 30,
    zone: {
      abbreviation: 'CET',
      offset: -60
    }
  }
  const unixTime = getUnixTime(berlinTime)
  expect(typeof unixTime === 'number').toBeTruthy()
  const epoch = Date.UTC(2018, 0, 2, 9, 30)
  expect(unixTime).toEqual(epoch)
})

it('recognizes daylight-saving time', () => {
  const berlinTime = {
    year: 2018,
    month: 7,
    day: 2,
    hours: 11,
    minutes: 30,
    zone: {
      abbreviation: 'CEST',
      offset: -120
    }
  }
  const unixTime = getUnixTime(berlinTime)
  expect(typeof unixTime === 'number').toBeTruthy()
  const epoch = Date.UTC(2018, 6, 2, 9, 30)
  expect(unixTime).toEqual(epoch)
})

it('checks, that other time zone is specified, if required', () => {
  const berlinTime = {
    year: 2018,
    month: 7,
    day: 2,
    hours: 11,
    minutes: 30
  }
  expect(() => getUnixTime(berlinTime)).toThrow()
})

it('checks, that only one time zone is requested to convert from', () => {
  const berlinTime = {
    year: 2018,
    month: 7,
    day: 2,
    hours: 11,
    minutes: 30,
    zone: {
      abbreviation: 'CEST',
      offset: -120
    }
  }
  expect(() => getUnixTime(berlinTime, berlin)).toThrow()
})

it('returns the epoch, that only one time zone is requested to convert from', () => {
  const berlinTime = {
    year: 2018,
    month: 7,
    day: 2,
    hours: 11,
    minutes: 30,
    epoch: 1530523800000,
    zone: {
      abbreviation: 'CEST',
      offset: -120
    }
  }
  const unixTime = getUnixTime(berlinTime)
  expect(typeof unixTime === 'number').toBeTruthy()
  const epoch = Date.UTC(2018, 6, 2, 9, 30)
  expect(unixTime).toEqual(epoch)
})

it('checks, that other time zone is not requested if epoch is included', () => {
  const berlinTime = {
    year: 2018,
    month: 7,
    day: 2,
    hours: 11,
    minutes: 30,
    epoch: 1530523800000
  }
  expect(() => getUnixTime(berlinTime, berlin)).toThrow()
})
