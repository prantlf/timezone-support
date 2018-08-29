/* global it, expect */

const { getTimeZone, addTimeZone } = require('../dist/index')

it('is exported as a function', () => {
  expect(typeof addTimeZone === 'function').toBeTruthy()
})

it('adds a custom time zone', () => {
  const test = addTimeZone({
    name: 'Etc/Test',
    abbreviations: ['TST'],
    offsets: [],
    untils: [],
    population: 0
  })
  expect(typeof test === 'object').toBeTruthy()
  const test2 = getTimeZone('Etc/Test')
  expect(test2).toBe(test)
})

it('accepts packed time zone data in a string', () => {
  const { name, abbreviations, offsets, untils, population } = addTimeZone('Etc/Test|TST|0|0|')
  expect(name).toEqual('Etc/Test')
  expect(Array.isArray(abbreviations)).toBeTruthy()
  expect(abbreviations.length).toEqual(1)
  expect(abbreviations[0]).toEqual('TST')
  expect(Array.isArray(offsets)).toBeTruthy()
  expect(offsets.length).toEqual(1)
  expect(offsets[0]).toEqual(0)
  expect(Array.isArray(untils)).toBeTruthy()
  expect(untils.length).toEqual(1)
  expect(untils[0]).toEqual(Infinity)
  expect(population).toEqual(0)
})
