import {
  listTimeZones, findTimeZone, getUTCOffset, getZonedTime, getUnixTime,
  setTimeZone, convertTimeToDate, convertDateToTime
} from 'timezone-support'
import { populateTimeZones } from '../dist/lookup-convert'
import { parseZonedTime, formatZonedTime } from '../dist/parse-format'

test('Type declarations for TypeScript', () => {
  const timestamp = 1538822326765
  const date = new Date(timestamp)
  const customDateString = '6.10.2018 12:38:46.765'
  const customFormat = 'D.M.YYYY H:mm:ss.SSS'
  const time = {
    year: 2018, month: 10, day: 6, hours: 12, minutes: 38, seconds: 0
  }
  const data = {
    zones: [
      'Europe/Berlin|CET CEST CEMT|-10 -20 -30|01010101010101210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 kL0 Nc0 m10 WM0 1ao0 1cp0 dX0 jz0 Dd0 1io0 17c0 1fA0 1a00 1ehA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e5'
    ],
    links: [
      'Europe/Berlin|Etc/Test'
    ]
  }

  listTimeZones()

  const berlin = findTimeZone('Europe/Berlin')

  getUTCOffset(date, berlin)
  getUTCOffset(timestamp, berlin)

  const berlinTime = getZonedTime(date, berlin)
  getZonedTime(timestamp, berlin)

  getUnixTime(time, berlin)
  getUnixTime(berlinTime)

  setTimeZone(time, berlin)
  setTimeZone(date, berlin, { useUTC: false })

  convertTimeToDate(berlinTime)

  convertDateToTime(date)

  parseZonedTime(customDateString, customFormat)

  formatZonedTime(berlinTime, customFormat)

  populateTimeZones(data)
})
