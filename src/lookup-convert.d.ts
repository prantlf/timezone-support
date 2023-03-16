type DateInput = Date | number

interface TimeZoneInfo {
  name: string
}

interface TimeZoneOffset {
  abbreviation?: string
  offset: number
}

interface Time {
  year: number
  month: number
  day: number
  hours: number
  minutes: number
  seconds?: number
  milliseconds?: number
  dayOfWeek?: number
  epoch?: number
  zone?: TimeZoneOffset
}

interface SetTimeZoneOptions {
  useUTC: boolean
}

interface PackedTimeZones {
  [ key: string ]: string
}

interface TimeZoneData {
  zones: PackedTimeZones
  links: Array<string>
}

declare function populateTimeZones (TimeZoneData): void
declare function listTimeZones (): Array<string>
declare function getTimeZoneLinks (): { [alias: string]: string }
declare function findTimeZone (name: string): TimeZoneInfo

declare function getUTCOffset (date: DateInput, timeZone: TimeZoneInfo): TimeZoneOffset
declare function getZonedTime (date: DateInput, timeZone: TimeZoneInfo): Time
declare function getUnixTime (time: Time, timeZone?: TimeZoneInfo): number
declare function setTimeZone (time: Date | Time, timeZone: TimeZoneInfo, options?: SetTimeZoneOptions): Time

declare function convertTimeToDate (time: Time): Date
declare function convertDateToTime (date: Date): Time

export {
  populateTimeZones, listTimeZones, getTimeZoneLinks, findTimeZone, getUTCOffset,
  getZonedTime, getUnixTime, setTimeZone, convertTimeToDate, convertDateToTime,
  DateInput, TimeZoneInfo, TimeZoneOffset, Time, SetTimeZoneOptions, PackedTimeZones, TimeZoneData,
}

// export as namespace timezoneLookupConvert;
