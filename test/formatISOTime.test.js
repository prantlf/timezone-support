/* global it, expect */

const { formatISOTime } = require('../dist/index')

it('is exported as a function', () => {
  expect(typeof formatISOTime === 'function').toBeTruthy()
})

it('formats a time object to an ISO 8601 string', () => {
  const honoluluDate = {
    year: 2017,
    month: 11,
    day: 15,
    hours: 13,
    minutes: 1,
    seconds: 18,
    milliseconds: 234,
    zone: {
      abbreviation: 'HST',
      offset: 600
    }
  }
  const string = formatISOTime(honoluluDate)
  expect(string).toEqual('2017-11-15T23:01:18.234Z')
})

it('pads one-digit milliseconds', () => {
  const honoluluDate = {
    year: 2017,
    month: 11,
    day: 15,
    hours: 13,
    minutes: 1,
    seconds: 18,
    milliseconds: 1,
    zone: {
      abbreviation: 'HST',
      offset: 600
    }
  }
  const string = formatISOTime(honoluluDate)
  expect(string).toEqual('2017-11-15T23:01:18.001Z')
})

it('pads two-digit milliseconds', () => {
  const honoluluDate = {
    year: 2017,
    month: 11,
    day: 15,
    hours: 13,
    minutes: 1,
    seconds: 18,
    milliseconds: 12,
    zone: {
      abbreviation: 'HST',
      offset: 600
    }
  }
  const string = formatISOTime(honoluluDate)
  expect(string).toEqual('2017-11-15T23:01:18.012Z')
})
