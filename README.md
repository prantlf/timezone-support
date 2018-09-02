# Time Zone Support

Low-level time zone listing and date converting. Intended for adding time zone support to high-level date libraries, but also for direct application usage.

* Tiny code base - 3.5 KB minified, 1.5 KB gzipped. Do not pack unnecessary weight in your application.
* Packed time zone data - 175 KB minified, 22.5 KB gzipped. Single time zones are unpacked on demand.
* Generated from the official time zone database version 2018e. Canonical time zone names, aliases, UTC offsets, and daylight-saving time changes.
* Minimal interface for time zone lookup and conversions. Pparsing, formatting and manipulating dates is usually the task for a higher-level date library.

```js
const { listTimeZones, findTimeZone, getZonedTime, getUnixTime } = require('timezone-support')

// Scenario: List names of time zones to choose from
const timeZones = listTimeZones()
// Contains array of canonical time zone names: [ name, ... ]

// Scenario: Show a date stored in UTC in a chosen time zone
const berlin = findTimeZone('Europe/Berlin')
const nativeDate = new Date('...Z')
const berlinTime = getZonedTime(nativeDate, berlin)
// Contains time with zone: { year, month, day, hours, minutes,
//   seconds, milliseconds, zone: { abbreviation, offset } }

// Scenario: Convert time from a chosen time zone to UTC
const berlin = findTimeZone('Europe/Berlin')
const berlinTime = { year, ... }
const unixTime = getUnixTime(berlinTime, berlin)
const nativeDate = new Date(unixTime).toISOString()
// Contains UTC date in the ISO 8601 format: '...Z'
```
