/* global it, expect */

const { getTimeZone, linkTimeZone } = require('../dist/index')

it('is exported as a function', () => {
  expect(typeof linkTimeZone === 'function').toBeTruthy()
})

it('link a time zone to a custom alias', () => {
  linkTimeZone(['Europe/Berlin', 'Etc/Test'])
  const test = getTimeZone('Etc/Test')
  expect(typeof test === 'object').toBeTruthy()
  expect(test.name).toEqual('Europe/Berlin')
})
