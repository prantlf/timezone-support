/* global it, expect */

import { findTimeZone } from '../src/index'

it('is exported as a function', () => {
  expect(typeof findTimeZone === 'function').toBeTruthy()
})

it('includes a sample time zone', () => {
  findTimeZone('Etc/UTC')
  findTimeZone('Europe/Berlin')
})

it('caches once constructed time zone instances', () => {
  const localTime1 = findTimeZone('Europe/Berlin')
  const localTime2 = findTimeZone('Europe/Berlin')
  expect(localTime1).toBe(localTime2)
})

it('throws an error for unrecognized time zones', () => {
  expect(() => findTimeZone('Test')).toThrow()
})

it('recognizes obsolete time zone names', () => {
  const { name } = findTimeZone('Europe/Sarajevo')
  expect(name).toEqual('Europe/Belgrade')
})
