/* global it, expect */

import { convertTimeToDate } from '../src/lookup-convert'

it('is exported as a function', () => {
  expect(typeof convertTimeToDate === 'function').toBeTruthy()
})

it('converts a complete time to date', () => {
  const time = {
    year: 2018,
    month: 1,
    day: 2,
    hours: 10,
    minutes: 30,
    seconds: 15,
    milliseconds: 234,
    epoch: 1514885415234,
    zone: {
      abbreviation: 'CET',
      offset: -60
    }
  }
  const actualDate = convertTimeToDate(time)
  const expectedDate = new Date(Date.UTC(2018, 0, 2, 9, 30, 15, 234))
  expect(actualDate).toEqual(expectedDate)
})

it('converts a time without epoch to date', () => {
  const time = {
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
  const actualDate = convertTimeToDate(time)
  const expectedDate = new Date(Date.UTC(2018, 0, 2, 9, 30, 15, 234))
  expect(actualDate).toEqual(expectedDate)
})

it('converts a time without epoch and zone to date', () => {
  const time = {
    year: 2018,
    month: 1,
    day: 2,
    hours: 10,
    minutes: 30
  }
  const actualDate = convertTimeToDate(time)
  const expectedDate = new Date(2018, 0, 2, 10, 30)
  expect(actualDate).toEqual(expectedDate)
})

it('if time (hours, minutes and seconds) is not provided, defaults to midnight', () => {
  const time = {
    year: 2018,
    month: 1,
    day: 2
  }
  const actualDate = convertTimeToDate(time)
  const expectedDate = new Date(2018, 0, 2, 0, 0)
  expect(actualDate).toEqual(expectedDate)
})
