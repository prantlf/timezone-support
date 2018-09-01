/* global it, expect */

const { findTimeZone, linkTimeZone } = require('../dist/index')

function checkTmeZone (timeZone) {
  expect(typeof timeZone === 'object').toBeTruthy()
  expect(timeZone.name).toEqual('Europe/Berlin')
}

it('is exported as a function', () => {
  expect(typeof linkTimeZone === 'function').toBeTruthy()
})

it('link a time zone to a custom alias', () => {
  linkTimeZone(['Europe/Berlin', 'Etc/Test'])
  const test = findTimeZone('Etc/Test')
  checkTmeZone(test)
})

it('link a time zone to a custom alias using packed string', () => {
  linkTimeZone('Europe/Berlin|Etc/Test2')
  const test = findTimeZone('Etc/Test2')
  checkTmeZone(test)
})
