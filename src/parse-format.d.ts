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

declare function parseZonedTime (input: string, format: string): Time
declare function formatZonedTime (time: Time, format: string): string

export { parseZonedTime, formatZonedTime }

// export as namespace timezoneParseFormat;
