# Time Zone Support

Low-level time zone listing and date converting. Serves for adding time support to high-level date libraries.

* Tiny code base - 2.5 KB minified, 1.25 KB gzipped. Do not pack unnecessary weight in your application.
* Packed time zone data - 175 KB minified, 22.5 KB gzipped. Single time zones and unpacked on demand.
* Generated from the official time zone database version 2018e. Canonical time zone names, aliases, UTC offsets, and daylight-saving time changes.
* Time zone lookup and conversions separated from time parsing, formatting and manipulating. The latter is usually the task for a higher-level date library.

The full and properly layered support for date handling consists of:

* Interface for parsing, formatting and manipulating dates. For example: [day.js] with the [TimeZone plugin].
* Time zone conversion support. For example: this library.
* Time zone data. For example: [iana-tz-data].

```js
import { listTimeZones, findTimeZone, getZonedTime, getUnixTime } from 'timezone-support'

// Scenario: list names of supported time zones
const timeZones = listTimeZones()

// Scenario: convert a UTC timestamp to time in the chosen time zone
const berlin = findTimeZone('Europe/Berlin')
const originalDate = new Date()
const berlinDate = getZonedTime(originalDate.valueOf(), berlin)

// Scenario: convert time in a chosen time zone to the UTC timestamp
const berlin = findTimeZone('Europe/Berlin')
const berlinDate = { ... }
const utcDate = getNativeDate(berlinlDate, berlin))
```
