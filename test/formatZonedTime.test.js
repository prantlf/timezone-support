/* global it, expect */

const { formatZonedTime } = require('../dist/parse-format')

it('is exported as a function', () => {
  expect(typeof formatZonedTime === 'function').toBeTruthy()
})

it('formats a time object to a string with no padding needed', () => {
  const honoluluDate = {
    year: 2017,
    month: 11,
    day: 15,
    hours: 23,
    minutes: 17,
    seconds: 18,
    milliseconds: 234,
    zone: {
      abbreviation: 'HST',
      offset: 600
    }
  }
  const string = formatZonedTime(honoluluDate, 'A S SS SSS s ss m mm h hh H HH D DD M MM Y YY YYYY z Z ZZ')
  expect(string).toEqual('PM 2 23 234 18 18 17 17 11 11 23 23 15 15 11 11 2017 17 2017 HST -10:00 -1000')
})

it('pads single digits with zeros', () => {
  const berlinDate = {
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
  const string = formatZonedTime(berlinDate, 'A S SS SSS s ss m mm h hh H HH D DD M MM Y YY YYYY z Z ZZ')
  expect(string).toEqual('AM 0 00 004 5 05 3 03 9 09 9 09 2 02 1 01 1 01 0001 CET +01:00 +0100')
})

it('leaves non-token parts of the format intact', () => {
  const string = formatZonedTime({}, ' [S]:/-.()[ SS h ]')
  expect(string).toEqual(' S:/-.() SS h ')
})
