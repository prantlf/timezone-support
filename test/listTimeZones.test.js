/* global it, expect */

const { listTimeZones } = require('../dist/index')

it('is exported as a function', () => {
  expect(typeof listTimeZones === 'function').toBeTruthy()
})

it('returns an array of strings', () => {
  const timeZones = listTimeZones()
  expect(Array.isArray(timeZones)).toBeTruthy()
  expect(timeZones.every(item => typeof item === 'string')).toBeTruthy()
})

it('includes the well-known time zone', () => {
  const timeZones = listTimeZones()
  expect(timeZones.indexOf('Europe/Berlin')).toBeGreaterThanOrEqual(0)
})
