/* global it, expect */

const { getUTC } = require('../dist')

it('is exported as a function', () => {
  expect(typeof getUTC === 'function').toBeTruthy()
})

it('returns infoamtion about UTC', () => {
  const utc = getUTC()
  expect(typeof utc === 'object').toBeTruthy()
  const { name } = utc
  expect(name).toBe('Etc/UTC')
})
