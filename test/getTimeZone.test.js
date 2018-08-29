/* global it, expect */

const { getTimeZone } = require('../dist/index')

it('is exported as a function', () => {
  expect(typeof getTimeZone === 'function').toBeTruthy()
})

it('includes a sample time zone', () => {
  getTimeZone('Europe/Berlin')
})

it('caches once constructed time zone instances', () => {
  const localTime1 = getTimeZone('Europe/Berlin')
  const localTime2 = getTimeZone('Europe/Berlin')
  expect(localTime1).toBe(localTime2)
})

it('throws an error for unrecognized time zones', () => {
  expect(() => getTimeZone('Test')).toThrow()
})

it('recognizes obsolete time zone names', () => {
  const { name } = getTimeZone('Europe/Sarajevo')
  expect(name).toEqual('Europe/Belgrade')
})
