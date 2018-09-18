/* global it, expect */

import { formatZonedTime } from '../src/parse-format'

it('is exported as a function', () => {
  expect(typeof formatZonedTime === 'function').toBeTruthy()
})

it('formats a time object to a string with no padding needed', () => {
  const honoluluTime = {
    year: 2017,
    month: 11,
    day: 15,
    dayOfWeek: 3,
    hours: 23,
    minutes: 17,
    seconds: 18,
    milliseconds: 234,
    zone: {
      abbreviation: 'HST',
      offset: 600
    }
  }
  const string = formatZonedTime(honoluluTime, 'A S SS SSS s ss m mm h hh H HH d D DD M MM Y YY YYYY z Z ZZ')
  expect(string).toEqual('PM 2 23 234 18 18 17 17 11 11 23 23 3 15 15 11 11 2017 17 2017 HST -10:00 -1000')
})

it('pads single digits with zeros', () => {
  const berlinTime = {
    year: 1,
    month: 1,
    day: 2,
    hours: 9,
    minutes: 3,
    seconds: 5,
    milliseconds: 4,
    zone: {
      abbreviation: 'CET',
      offset: -60
    }
  }
  const string = formatZonedTime(berlinTime, 'A S SS SSS s ss m mm h hh H HH D DD M MM Y YY YYYY z Z ZZ')
  expect(string).toEqual('AM 0 00 004 5 05 3 03 9 09 9 09 2 02 1 01 1 01 0001 CET +01:00 +0100')
})

it('pads pairs of digits with zeros', () => {
  const berlinTime = {
    year: 67,
    milliseconds: 34
  }
  const string = formatZonedTime(berlinTime, 'YYYY SSS')
  expect(string).toEqual('0067 034')
})

it('pads triplets of digits with zeros', () => {
  const berlinTime = {
    year: 967
  }
  const string = formatZonedTime(berlinTime, 'YYYY')
  expect(string).toEqual('0967')
})

it('leaves non-token parts of the format intact', () => {
  const string = formatZonedTime({}, ' [S]:/-.()[ SS h ]')
  expect(string).toEqual(' S:/-.() SS h ')
})

it('formats 00:00 as 12:00 AM', () => {
  const string = formatZonedTime({ hours: 0 }, 'h a')
  expect(string).toEqual('12 am')
})

it('formats 12:00 as 12:00 PM', () => {
  const string = formatZonedTime({ hours: 12 }, 'h a')
  expect(string).toEqual('12 pm')
})

it('uses formatters cached from a previously used format', () => {
  formatZonedTime({ year: 2018 }, 'YYYY')
  const string = formatZonedTime({ year: 2018 }, 'YYYY')
  expect(string).toEqual('2018')
})
