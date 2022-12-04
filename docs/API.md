# API Reference

This library contains pure, immutable functions to query time zones, convert dates among them and parse and form date strings. The functions are grouped in three modules according to their usage scenarios.

### Table of Contents

- [Loading](#loading)
- [Modules](#modules)
  - [index](#index)
  - [lookup-convert](#lookup-convert)
  - [parse-format](#parse-format)
- [Functions](#functions)
  - [convertDateToTime](#convertdatetotime)
  - [convertTimeToDate](#converttimetodate)
  - [findTimeZone](#findtimezone)
  - [formatZonedTime](#formatzonedtime)
  - [getUnixTime](#getunixtime)
  - [getUTCOffset](#getutcoffset)
  - [getZonedTime](#getzonedtime)
  - [listTimeZones](#listtimezones)
  - [parseZonedTime](#parsezonedtime)
  - [populateTimeZones](#populatetimezones)
  - [setTimeZone](#settimezone)
- [Data Generator](#data-generator)

## Loading

Load the main module in an application using CommonJS modules:

```js
const { findTimeZone, getZonedTime } = require('timezone-support')
```

Load the main module in an application using ES6 modules:

```js
import { findTimeZone, getZonedTime } from 'timezone-support'
```

Load the main module in the browser with plain JavaScript:

```html
<script src="./node_modules/timezone-support/dist/index.umd.js"></script>
<script>
  (() => {
    const { findTimeZone, getZonedTime } = window.timezoneSupport
  })()
</script>
```

You can also load a specific version from CDN, for example: https://unpkg.com/timezone-support@3.0.0/dist/index.umd.js.

Load the main module in Node.js older than 14.8, which didn't support `exports` in `package.json`:

```js
import {
  findTimeZone, getZonedTime
} from './node_modules/timezone-support/dist/index.mjs'
```

## Modules

Modules `dist/*.mjs` require ES6 including the new module syntax, as available in Node.js 8 and newer. Modules `dist/*.js` require ES5 and follow the CommonJS standard for older Node.js releases. Files `dist/*.umd.js` require ES5, are minified and follow the UMD standard to work well in web browsers.

### index

Main package module. The most usually chosen module with time zone lookup and date conversion functionality. Includes the bundled time zone data. Contains all functions from the module `lookup-convert` except for [populateTimeZones](#populatetimezones).

```
const { ... } = require('timezone-support')
import { ... } from 'timezone-support'
<script src="./node_modules/timezone-support/dist/index.umd.js"></script>
```

Importing in Node.js older than 14.8, which didn't support `exports` in `package.json`:

```
import { ... } from './node_modules/timezone-support/dist/index.mjs'
```

### lookup-convert

Offers the time zone lookup and date conversion functionality, like the `index` module, but does not include the time zone data. You have to initialize the library with your own the time zone data by calling [populateTimeZones](#populatetimezones) before the first usage.

```
const { ... } = require('timezone-support/dist/lookup-convert')
import { ... } from 'timezone-support/lookup-convert'
<script src="./node_modules/timezone-support/dist/lookup-convert.umd.js"></script>
```

Importing in Node.js older than 14.8, which didn't support `exports` in `package.json`:

```
import { ... } from './node_modules/timezone-support/dist/lookup-convert.mjs'
```

### parse-format

Offers a minimal date parsing and formatting support, if you want to use this library in an end-user application. Recognizes only numeric formatting tokens and no locale support.

```
const { ... } = require('timezone-support/dist/parse-format')
import { ... } from 'timezone-support/parse-format'
<script src="./node_modules/timezone-support/dist/parse-format.umd.js"></script>
```

Importing in Node.js older than 14.8, which didn't support `exports` in `package.json`:

```
import { ... } from './node_modules/timezone-support/dist/parse-format.mjs'
```

## Functions

Functions converting to an arbitrary time zone accept either a `Date` object, or a UNIX timestamp. (The UNIX timestamp is the time from the epoch in milliseconds, as returned by `date.prototype.getTime`.) They produce a complete [time object]. Functions converting from an arbitrary time zone accept a [time object] and return the UNIX timestamp.

### convertDateToTime

```
convertDateToTime(date: Date) : Time
```

Returns a complete [time object] equal to the given date using the the local time for the time zone information.

* `date` - a source `Date` object

```js
const { convertDateToTime } = require('timezone-support')
const date = new Date()
const localTime = convertDateToTime(date)
// Returns {
//   year, month, day, hours, minutes, seconds, milliseconds,
//   dayOfWeek, epoch,
//   zone: { abbreviation, offset }
// }
```

### convertTimeToDate

```
convertTimeToDate(time: Time) : Date
```

Returns a `Date` object equal to the given [time object], converting the time zone of the source time object to the local time.

* `time` - a complete [time object]

```js
const { convertTimeToDate } = require('timezone-support')
const localTime = { year: 2018, month: 9, day: 2, hours: 10, minutes: 0,
                    zone: { abbreviation: 'CEST', offset: -120 } }
const date = convertTimeToDate(date)
// Returns a date in the local time
```

### findTimeZone

```
findTimeZone(name: string) : object
```

Returns an object with time zone data for the given canonical time zone name. Recognizes deprecated time zone names too. Throws an error, if no time zone can be found for the given name.

* `name` - a canonical time zone name

```js
const { findTimeZone } = require('timezone-support')
const berlin = findTimeZone('Europe/Berlin')
// Returns an object to be used by other functions
```

See [IANA time zones] for the complete available list.

### formatZonedTime

```
formatZonedTime(time: Time, format: string) : string
```

Formats a [time object] using a custom format pattern to a string.

```js
const { formatZonedTime } = require('timezone-support/parse-format')

const time = { year: 2018, month: 9, day: 2, hours: 10, minutes: 0,
               zone: { abbreviation: 'CEST', offset: -120 } }
const format = 'D.M.YYYY H:mm zZ'
const output = formatZonedTime(time, format)
// Returns "2.9.2018 10:00 CEST+02:00"
```

The following tokens are recognized in the format string:

| Unit                    | Token | Result examples            |
|-------------------------|-------|----------------------------|
| Month                   | M     | 1, 2, ..., 12              |
|                         | MM    | 01, 02, ..., 12            |
| Day of month            | D     | 1, 2, ..., 31              |
|                         | DD    | 01, 02, ..., 31            |
| Day of week             | d     | 0, 1, ..., 6               |
| Year                    | YY    | 00, 01, ..., 99            |
|                         | YYYY  | 1900, 1901, ..., 2099      |
| AM/PM                   | A     | AM, PM                     |
|                         | a     | am, pm                     |
| Hour                    | H     | 0, 1, ... 23               |
|                         | HH    | 00, 01, ... 23             |
|                         | h     | 1, 2, ..., 12              |
|                         | hh    | 01, 02, ..., 12            |
| Minute                  | m     | 0, 1, ..., 59              |
|                         | mm    | 00, 01, ..., 59            |
| Second                  | s     | 0, 1, ..., 59              |
|                         | ss    | 00, 01, ..., 59            |
| 1/10 of second          | S     | 0, 1, ..., 9               |
| 1/100 of second         | SS    | 00, 01, ..., 99            |
| Millisecond             | SSS   | 000, 001, ..., 999         |
| Timezone abbreviation   | z     | CET, CEST, EST, EDT, ...   |
| Timezone offset to UTC  | Z     | -01:00, +00:00, ... +12:00 |
|                         | ZZ    | -0100, +0000, ..., +1200   |

To escape characters in the format string, wrap them in square brackets (e.g. `[GMT]`). Punctuation symbols (-:/.()) do not need to be wrapped.

### getUnixTime

```
getUnixTime(time: Time, timeZone?: object) : number
```

Returns a Unix timestamp (UTC) for the given incomplete [time object] converted from the given time zone.

* `time` - the source (incomplete) [time object]
* `timeZone` - the time zone object returned by [`findTimeZone`](#findtimezone)

```js
const { findTimeZone, getUnixTime } = require('timezone-support')
const berlin = findTimeZone('Europe/Berlin')
const berlinTime = { year: 2018, month: 9, day: 2, hours: 10, minutes: 0 }
const date = getZonedTime(berlinTime, berlin)
// Returns the UNIX timestamp (UTC) in milliseconds
```

This method is usually used with incomplete time objects, which are entered by the user, or parsed from date strings without time zone information. (A complete [time object] contains properties `epoch` with the UTC time and `zone` with the time zone information. An incomplete one has to contain the date at least - year, month and day.)

The returned object is supposed to be passed to other functions, which use it to convert dates. It is not supposed to be inspected outside of this library.

### getUTCOffset

```
getUTCOffset(date: number|Date, timeZone: object) : object
```

Returns the offset to UTC for a given date and the specific time zone, together with the time zone abbreviation.

* `date` - either a `Date` object, or a UNIX timestamp returned by `date.prototype.getTime`
* `timeZone` - the time zone object returned by [`findTimeZone`](#findtimezone)

```js
const { findTimeZone, getUTCOffset } = require('timezone-support')
const berlin = findTimeZone('Europe/Berlin')
const date = new Date()
const timeZoneOffset = getUTCOffset(date, berlin)
// Returns {
//   abbreviation: 'CET'
//   offset: -60
// }
```

The `abbreviation` value contains a string with the time zone abbreviation as it was used at the given time. It may depend on daylight-saving changes and country politics. The `offset` value contains a number with the difference from the zoned time to UTC in minutes. If you add it to the timestamp of the zoned time, you will get the timestamp in UTC. It is consistent with the value returned by `Date.prototype.getTimezoneOffset` for the local time.

### getZonedTime

```
getZonedTime(date: number|Date, timeZone: object) : Time
```

Returns a complete [time object] for the given date converted to the given time zone. The conversion uses the UNIX timestamp (UTC) of the date.

* `date` - either a `Date` object, or a UNIX timestamp returned by `date.prototype.getTime`
* `timeZone` - the time zone object returned by [`findTimeZone`](#findtimezone)

```js
const { findTimeZone, getZonedTime } = require('timezone-support')
const berlin = findTimeZone('Europe/Berlin')
const date = new Date()
const time = getZonedTime(date, berlin)
// Returns {
//   year, month, day, hours, minutes, seconds, milliseconds,
//   dayOfWeek, epoch,
//   zone: { abbreviation, offset }
// }
```

### listTimeZones

```
listTimeZones() : Array<string>
```

Returns a list of canonical time zone names recognized by this library. Either included in the [`index`](#index) module (see the [moment-timezone's latest data]), or initialized by the [`populateTimeZones`](#populatetimezones) method.

```js
const { listTimeZones } = require('timezone-support')
const timeZones = listTimeZones()
// Returns [
//   'Africa/Abidjan',
//   ...
// ]
```

See [IANA time zones] for the complete available list.

### parseZonedTime

```
parseZonedTime(input: string, format: string) : Time
```

Parses a date string using a custom format pattern to a [time object]. If the string does not contain a time zone offset, it can be added by [setTimeZone](#settimezone).

```js
const { parseZonedTime } = require('timezone-support/parse-format')

const input = '2.9.2018 10:00 CEST+02:00'
const format = 'D.M.YYYY H:mm zZ'
const time = parseZonedTime(input, format)
// Returns { year: 2018, month: 9, day: 2, hours: 10, minutes: 0,
//           zone: { abbreviation: 'CEST', offset: -120 } }
```

The following tokens are recognized in the format string:

| Token  | Input example    | Description                       |
|--------|------------------|-----------------------------------|
| `YY`   | 18               | Two-digit year                    |
| `YYYY` | 2018             | Four-digit year                   |
| `M`    | 1-12             | Month, beginning at 1             |
| `MM`   | 01-12            | Month, 2-digits                   |
| `D`    | 1-31             | Day of month                      |
| `DD`   | 01-31            | Day of month, 2-digits            |
| `H`    | 0-23             | Hours                             |
| `HH`   | 00-23            | Hours, 2-digits                   |
| `h`    | 1-12             | Hours, 12-hour clock              |
| `hh`   | 01-12            | Hours, 12-hour clock, 2-digits    |
| `m`    | 0-59             | Minutes                           |
| `mm`   | 00-59            | Minutes, 2-digits                 |
| `s`    | 0-59             | Seconds                           |
| `ss`   | 00-59            | Seconds, 2-digits                 |
| `S`    | 0-9              | Hundreds of milliseconds, 1-digit |
| `SS`   | 00-99            | Tens of milliseconds, 2-digits    |
| `SSS`  | 000-999          | Milliseconds, 3-digits            |
| `z`    | EST              | Time zone abbreviation            |
| `Z`    | -5:00            | Offset from UTC, 2-digits         |
| `ZZ`   | -0500            | Compact offset from UTC, 2-digits |
| `A`    | AM PM            | Post or ante meridiem, upper-case |
| `a`    | am pm            | Post or ante meridiem, lower-case |

To escape characters in the format string, wrap them in square brackets (e.g. `[GMT]`). Punctuation symbols (-:/.()) do not need to be wrapped.

### populateTimeZones

```
populateTimeZones(data: object)
```

Initializes the time zone data and should be called just once, when the application starts. Needed only if you load the `lookup-convert` module instead of the `index` module.

The `data` object is supposed to contain packed time zone data as an array of strings and deprecated time zone names as an array of strings:

```js
const data = {
  zones: [
    'Europe/Berlin|CET CEST CEMT|-10 -20 -30|0101...|-2aFe0 11d0 ...|41e5',
    ...
  ],
  links: [
    'Europe/Prague|Europe/Bratislava'
    ...
  ]
}
```

See the [moment-timezone's latest data](../util/data/packed.json) as an example of the full data, which you can take a smaller part of to your application. This library includes [limited data for this decade](http://unpkg.com/timezone-support@3.0.0/dist/data-2012-2022.js) and [two other year spans](../src/lookup/). Read also abot [generation of custom time zone data](./usage.md#generate-custom-time-zone-data), which allows production of a module with smaller, limited time zone data for other time periods.

If this function is called later, than during the application startup, the behaviour of this module may be unpredictable. Some time zone data might be used and cached in the application. You should avoid re-initialization to prevent hidden errors.

This function is not exported from the `index` module to prevent usage mistakes, because that module includes the complete time zone data already.

```js
const { populateTimeZones, findTimeZone, getZonedTime } = require('timezone-support/lookup-convert')
const data = require('timezone-support/data-2012-2022')

// Get the time zone support ready to handle dates from years 2012-2022.
populateTimeZones(data)

const berlin = findTimeZone('Europe/Berlin')
const isoString = '2018-09-30T09:19:17.276Z'
const berlinTime = getZonedTime(new Date(isoString), berlin)
```

### setTimeZone

```
setTimeZone(time: Date|Time, timeZone: object, options?: object) : Time
```

Returns a new complete [time object] for the given one completed with the given time zone. The completion will add the UNIX timestamp (UTC) and the time zone information.

* `time` - a `Date` object or a source [time object]
* `timeZone` - the time zone object returned by [`findTimeZone`](#findtimezone)
* `options` - an object with options for the function call
* `options.useUTC` - a boolean flag to choose getters of the `Date` instance; `true` will choose the UTC getters (`getUTCFullYear`, `getUTCMonth`, ...) and `false` will choose the local-time getters (`getFullYear`, `getMonth`, ...)

```js
const { findTimeZone, setTimeZone } = require('timezone-support')
const berlin = findTimeZone('Europe/Berlin')
const time = { year: 2018, month: 9, day: 2, hours: 10, minutes: 0 }
const berlinTime = setTimeZone(time, berlin)
// Returns {
//   year, month, day, hours, minutes, seconds, milliseconds,
//   dayOfWeek, epoch,
//   zone: { abbreviation, offset }
// }
```

This method is supposed to be used with incomplete time objects, which are entered by the user, or parsed from date strings without time zone information.

Another possibility is to supply the time by a `Date` object, from which the date parts can be obtained by the corresponding local-time getters (`getFullYear`, `getMonth`, ...):

```js
const { findTimeZone, setTimeZone } = require('timezone-support')
const berlin = findTimeZone('Europe/Berlin')
const date = new Date(2018, 8, 2, 10, 0)
const berlinTime = setTimeZone(date, berlin, { useUTC: false })
// Returns {
//   year, month, day, hours, minutes, seconds, milliseconds,
//   dayOfWeek, epoch,
//   zone: { abbreviation, offset }
// }
```

Finally the source `Date` object, from which the date parts can be obtained by the corresponding UTC getters (`getUTCFullYear`, `getUTCMonth`, ...):

```js
const { findTimeZone, setTimeZone } = require('timezone-support')
const berlin = findTimeZone('Europe/Berlin')
const date = new Date(Date.UTC(2018, 8, 2, 10, 0))
const berlinTime = setTimeZone(date, berlin, { useUTC: true })
// Returns {
//   year, month, day, hours, minutes, seconds, milliseconds,
//   dayOfWeek, epoch,
//   zone: { abbreviation, offset }
// }
```

`Date` objects in the last two scenarios are initialized only for formatting or conversion purposes, because other methods, than the date part getters, deliver wrong results. Such "invalid" `Date` instances should exist only temporarily in a restricted scope. They should not be shared widely in the application to prevent mistakes from  happening. The local time in a valid `Date` object has to match the UTC time maintained by the same object.

## Data Generator

If you want to [limit the time zone data](#limit-the-loaded-time-zone-data) to improve performance of your application by reducing the size of the JavaScript code, you can use the command-line tool included in this package:

```txt
Usage: create-timezone-data [options] <first year> <last year>

Generates time zone data for a selected year range.

Options:
  -V, --version             output the version number
  -a, --all-years           includes all available years
  -c, --as-cjs-module       format the time zone data as a CommonJS module
  -d, --as-amd-module       format the time zone data as an AMD module
  -m, --as-module           format the time zone data as a JavaScript module
  -n, --umd-name <name>     UMD global export name, if not "timezoneData"
  -o, --output-file <file>  write the time zone data to a file
  -u, --as-umd-module       format the time zone data as an UMD module
  -o, --output-file <file>  write the time zone data to a file
  -h, --help                output usage information

  Time zone data are printed on the standard output as JSON by default.

  Examples:

    $ create-timezone-data 2012 2022
    $ create-timezone-data -m -o custom-data.js 1970 2038
```

The module generated by this tool exposes a data object as a default export, which is expected by the function [populatePluralData](#populatepluraldata).

[time object]: ./design.md#time-object
[IANA time zones]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
