interface PackedTimeZones {
  [ key: string ]: string
}

interface TimeZoneData {
  zones: PackedTimeZones
  links: Array<string>
}

declare const data: TimeZoneData

export default data

// export as namespace timezoneData;
