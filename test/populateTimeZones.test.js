/* global it, expect */

import { populateTimeZones, listTimeZones, findTimeZone } from '../src/lookup-convert'

const data = {
  zones: [
    'Europe/Berlin|CET CEST CEMT|-10 -20 -30|01010101010101210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 kL0 Nc0 m10 WM0 1ao0 1cp0 dX0 jz0 Dd0 1io0 17c0 1fA0 1a00 1ehA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e5'
  ],
  links: [
    'Europe/Berlin|Etc/Test'
  ]
}

let populated
function ensureTimeZones () {
  if (!populated) {
    populateTimeZones(data)
    populated = true
  }
}

it('is exported as a function', () => {
  expect(typeof populateTimeZones === 'function').toBeTruthy()
})

it('populates time zone names', () => {
  ensureTimeZones()
  const timeZones = listTimeZones()
  expect(Array.isArray(timeZones)).toBeTruthy()
  expect(timeZones.length).toEqual(1)
  expect(timeZones[0]).toEqual('Europe/Berlin')
})

it('populates time zone data', () => {
  ensureTimeZones()
  const berlin = findTimeZone('Europe/Berlin')
  expect(typeof berlin === 'object').toBeTruthy()
})

it('populates time zone aliases', () => {
  ensureTimeZones()
  const berlin = findTimeZone('Etc/Test')
  expect(typeof berlin === 'object').toBeTruthy()
  expect(berlin.name).toEqual('Europe/Berlin')
})
