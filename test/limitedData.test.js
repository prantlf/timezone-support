/* global it, expect */

import { populateTimeZones, findTimeZone, getZonedTime } from '../src/lookup-convert'
import limitedData from '../src/lookup/data-2012-2022'

let populated
function ensureTimeZones () {
  if (!populated) {
    populateTimeZones(limitedData)
    populated = true
  }
}

it('is exported as an object', () => {
  expect(typeof limitedData === 'object').toBeTruthy()
})

it('allows handling dates from years 2012-2022', () => {
  ensureTimeZones()
  const berlin = findTimeZone('Europe/Berlin')
  const isoString = '2018-09-30T09:19:17.276Z'
  const date = new Date(isoString)
  const berlinTime = getZonedTime(date, berlin)
  expect(typeof berlinTime === 'object').toBeTruthy()
  const { year, month, day, dayOfWeek, hours, minutes, seconds, milliseconds, epoch, zone } = berlinTime
  expect(year).toEqual(2018)
  expect(month).toEqual(9)
  expect(day).toEqual(30)
  expect(dayOfWeek).toEqual(0)
  expect(hours).toEqual(11)
  expect(minutes).toEqual(19)
  expect(seconds).toEqual(17)
  expect(milliseconds).toEqual(276)
  expect(epoch).toEqual(date.getTime())
  expect(typeof zone === 'object').toBeTruthy()
  const { abbreviation, offset } = zone
  expect(/\w+/.test(abbreviation)).toBeTruthy()
  expect(offset).toEqual(-120)
})
