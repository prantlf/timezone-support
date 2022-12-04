# Usage Scenarios

The minimal, but powerful API of this module provides functionality for both date/time-supporting libraries and end-user applications.

### Table of Contents

- [List all available time zones](#list-all-available-time-zones)
- [Convert a date from UTC to a specific time zone](#convert-a-date-from-utc-to-a-specific-time-zone)
- [Convert a date from a specific time zone to UTC](#convert-a-date-from-a-specific-time-zone-to-utc)
- [Format a date/time to a custom string](#format-a-datetime-to-a-custom-string)
- [Parse a date/time from a custom string](#parse-a-datetime-from-a-custom-string)
- [Set time zone to a zone-less date](#set-time-zone-to-a-zone-less-date)
- [Get UTC offset for a specific time zone](#get-utc-offset-for-a-specific-time-zone)
- [Use the native Date object](#use-the-native-date-object)
- [Limit the loaded time zone data](#limit-the-loaded-time-zone-data)
- [Generate custom time zone data](#generate-custom-time-zone-data)

## List all available time zones

Users may need to choose the time zone, which they want to see and enter dates in. Time zones can be listed in a dropdown for the user to choose from, for example.

```js
const { listTimeZones } = require('timezone-support')
const timeZones = listTimeZones()
```

See the function [listTimeZones](./API.md#listtimezones) for more information.

## Convert a date from UTC to a specific time zone

Dates are usually stored in UTC, but they are supposed to be displayed in a time zone chosen by the user. The result of the conversion can be displayed in an editing control for the user to check and/or edit the current value.

```js
const { findTimeZone, getZonedTime } = require('timezone-support')
const berlin = findTimeZone('Europe/Berlin')

// From a native Date object
const nativeDate = new Date()
const berlinTime = getZonedTime(nativeDate, berlin)

// From a string formatted in ISO 8601 - use the Date object
const isoString = '2018-09-02T10:04:30.982Z'
const berlinTime = getZonedTime(new Date(isoString), berlin)

// From a UNIX timestamp
const unixTime = 1535882748900
const berlinTime = getZonedTime(unixTime, berlin)
```

## Convert a date from a specific time zone to UTC

Dates are usually entered in a time zone chosen by the user, but they are supposed to be stored in UTC. The result of the conversion can be stored safely to prevent the time zone information from being lost.

```js
const { findTimeZone, getUnixTime } = require('timezone-support')
const berlin = findTimeZone('Europe/Berlin')

// To a UNIX timestamp from time object including time zone
const berlinTime = { year: 2018, month: 9, day: 2, hours: 10, minutes: 0,
                     zone: { abbreviation: 'CEST', offset: -120 } }
const unixTime = getUnixTime(berlinTime)

// To a UNIX timestamp with an explicitly specified tine zone
const berlinTime = { year: 2018, month: 9, day: 2, hours: 10, minutes: 0 }
const unixTime = getUnixTime(berlinTime, berlin)

// To a native Date object
const berlinTime = { year: 2018, month: 9, day: 2, hours: 10, minutes: 0 }
const nativeDate = new Date(getUnixTime(berlinTime, berlin))

// To a string formatted in ISO 8601 - use the Date object
const berlinTime = { year: 2018, month: 9, day: 2, hours: 10, minutes: 0 }
const isoString = new Date(getUnixTime(berlinTime, berlin)).toISOString()
```

See the function [getUnixTime](./API.md#getunixtime) for more information.

## Format a date/time to a custom string

Some applications let their users freely configure, how dates will be formatted. While date formatting is usually supplied by higher-level libraries, which support locales and include other functionality to manipulate dates, very simple formatting is available in this library too.

```js
const { formatZonedTime } = require('timezone-support/parse-format')

const zonedTime = { year: 2018, month: 9, day: 2, hours: 10, minutes: 0,
                    zone: { abbreviation: 'CEST', offset: -120 } }
const displayTime = formatZonedTime(zonedTime, 'D.M.YYYY H:mm:ss zZ')
```

See the function [formatZonedTime](./API.md#formatzonedtime) for more information.

## Parse a date/time from a custom string

Some applications let their users freely configure, what date format will be used when parsing strings. While string parsing is usually supplied by higher-level libraries, which support locales and include other functionality to manipulate dates, very simple parsing is available in this library too.

```js
const { parseZonedTime } = require('timezone-support/parse-format')

const displayTime = '2.9.2018 10:00 CET+02:00'
const zonedTime = parseZonedTime(displayTime, 'D.M.YYYY H:mm zZ')
```

See the function [parseZonedTime](./API.md#parsezonedtime) for more information.

## Set time zone to a zone-less date

Date pickers usually supply the date, which the user selected and the time zone is implied from user settings. The time zone should be set to such date before it is returned from the editing control.

```js
const { findTimeZone, setTimeZone } = require('timezone-support')
const berlin = findTimeZone('Europe/Berlin')

// Time object with the date parts without time zone
const zonelessTime = { year: 2018, month: 9, day: 2, hours: 10, minutes: 0 }
const zonedTime = setTimeZone(zonelessTime, berlin)

// Date instance with the date parts in the UTC representation
const zonelessUTCDate = new Date(Date.UTC(2018, 8, 2, 10, 0))
const zonedTime = setTimeZone(zonelessUTCDate, berlin, { useUTC: true })

// Date instance with the date parts in the local time zone representation
const zonelessLocalDate = new Date(2018, 8, 2, 10, 0)
const zonedTime = setTimeZone(zonelessLocalDate, berlin, { useUTC: false })
```

See the function [setTimeZone](./API.md#settimezone) for more information.

## Get UTC offset for a specific date and time zone

Libraries usually provide all what is needed to parse, format, compare or manipulate a date value. They accept the native `Date` object, which offers access to date and time parts in the local time zone and UTC. The UTC offset of an arbitrary time zone can be used to construct a `Date` instance, which returns its date and time parts in the specified time zone. Such instance can be used for formatting, except for its timestamp and time zone offset, which are wrong.

```js
const { findTimeZone, getUTCOffset } = require('timezone-support')
const berlin = findTimeZone('Europe/Berlin')

// Date timestamp in UTC
const unixTime = Date.UTC(2018, 8, 2, 10, 0)
// Request the UTC offset for this day in the "Europe/Berlin" time zone
const { offset } = getUTCOffset(unixTime, berlin)
// Create a new Date instance with date and time parts in the "Europe/Berlin" time zone
const berlinDate = new Date(unixTime - offset * 60 * 1000)
// Returns "2018-9-2 12:00:00" across the globe
const formattedDate = berlinDate.toLocaleString()
// Only date and time part getters are allowed to be used on this Date instance:
// getFullYear, getMonth, getDate, getHours, getMinutes, getSeconds and getMilliseconds
```

See the function [getUTCOffset](./API.md#getutcoffset) for more information.

## Use the native Date object

Most libraries use the native `Date` object on their interface. UNIX timestamp can be passed directory to its constructor and can be obtained from a `Date` instance by calling `Date.prototype.getTime`. Time object can be exchanged for a `Date` object by using conversion functions.

```js
const { convertDateToTime, convertTimeToDate } = require('timezone-support')

// Convert a date to a time object: { year, month, day, dayOfWeek, hours,
// minutes, seconds, milliseconds, epoch, zone: { abbreviation, offset } }
const nativeDate = new Date()
const localTime = convertDateToTime(nativeDate)
// This retains the local time in the time zone information of the time object.

// Convert a time object to a date (in the local time zone):
const berlinTime = { year: 2018, month: 9, day: 2, hours: 10, minutes: 0,
                     zone: { abbreviation: 'CEST', offset: -120 } }
const localDate = convertTimeToDate(berlinTime)
// This converts the time zone of the time object to the local time zone.
```

See the functions [convertDateToTime](./API.md#convertdatetotime) and [convertTimeToDate](./API.md#converttimetodate) for more information.

## Limit the loaded time zone data

If you process dates only from a limited time period, you can initialize this library with a subset of the [IANA time zone database] and decrease the loading time of your application. For example, the difference between the full time zone data and the data for this decade only:

```txt
Full IANA TZ data:  923 KB minified, 33.3 KB gzipped
Data for 1900-2050: 200 KB minified, 23.3 KB gzipped
Data for 1970-2038: 135 KB minified, 13.9 KB gzipped
Data for 2012-2022:  27 KB minified,  6.5 KB gzipped
```

Custom time zone data can be used if the module `lookup-convert` is loaded instead of the default `index` module.

```html
<script src="https://unpkg.com/timezone-support@3.0.0/dist/lookup-convert.umd.js"></script>
<script src="https://unpkg.com/timezone-support@3.0.0/dist/data-2012-2022.umd.js"></script>
<script>
  (() => {
    const { populateTimeZones, findTimeZone, getZonedTime } = window.timezoneSupport
    const data = window.timezoneData']

    populateTimeZones(data)

    const berlin = findTimeZone('Europe/Berlin')
    const isoString = '2018-09-01T09:19:17.276Z'
    const berlinTime = getZonedTime(new Date(isoString), berlin)
  })()
</script>
```

If you want to use the time zone data for years 2012-2022 published by this project, you can simplify your code by using a bundled package with both data and code.

```html
<script src="https://unpkg.com/timezone-support@3.0.0/dist/index-2012-2022.umd.js"></script>
<script>
  (() => {
    const { findTimeZone, getZonedTime } = window.timezoneSupport

    const berlin = findTimeZone('Europe/Berlin')
    const isoString = '2018-09-01T09:19:17.276Z'
    const berlinTime = getZonedTime(new Date(isoString), berlin)
  })()
</script>
```

The following data modules ara published within this project to be used in Node.js:

```txt
timezone-support/data
timezone-support/data-1900-2050
timezone-support/data-1970-2038
timezone-support/data-2012-2022
```

and in the browser:

```txt
dist/data.umd.js
dist/data-1900-2050.umd.js
dist/data-1970-2038.umd.js
dist/data-2012-2022.umd.js
```

The following complete (code+data) modules ara published within this project to be used in Node.js:

```txt
timezone-support/index
timezone-support/index-1900-2050
timezone-support/index-1970-2038
timezone-support/index-2012-2022
```

and in the browser:

```txt
dist/index.umd.js
dist/index-1900-2050.umd.js
dist/index-1970-2038.umd.js
dist/index-2012-2022.umd.js
```

See the function [populateTimeZones](./API.md#populatetimezones) for more information.

## Generate custom time zone data

Except for the time zone data for the three year spans bundled with this module, other data modules can be generated to customize the year span and thus the overall package size. There is a command line tool [`create-timezone-data`](./API.md#data-generator) for this included in this package.

For example, you can generate time zone data for years 1978-2028 and save it to the module `data-1978-2028.js` in the CommonJS format, which you will bundle to your application:

```sh
create-timezone-data -c -o custom-data-1978-2028.js 1978 2028
```

And then load them instead of the default full time zone data. You need to require `timezone-support/lookup-convert` instead of `timezone-support` everywhere in your application and populate the library with the custom data, when your application starts:

```js
const { populateTimeZones } = require('timezone-support/lookup-convert')
const data = require('./data-1978-2028')

populateTimeZones(data)
```

Let us have a look, how the same would work in an application loading their assets directly in the browser. You would generate a UMD module instead:

```sh
create-timezone-data -u -o custom-data-1978-2028.js -n timezoneData10782028 1978 2028
```

And then load them at the beginning of a plain JavaScript application:

```html
<script src="https://unpkg.com/timezone-support@3.0.0/dist/lookup-convert.umd.js"></script>
<script src="./data-1978-2028.js"></script>
<script>
  (() => {
    const { populateTimeZones } = window.timezoneSupport

    populateTimeZones(window.timezoneData10782028)
  })()
</script>
```

Or load it in an application using AMD modules:

```html
<script src="https://unpkg.com/requirejs/require.js"></script>
<script src="https://unpkg.com/timezone-support@3.0.0/dist/lookup-convert.umd.js"></script>
<script src="./data-1978-2028.js"></script>
<script>
  require([
    'timezone-lookup-convert', 'timezone-data-1078-2028'
  ], function (tz, data) {
    tz.populateTimeZones(data)
  })()
</script>
```

[IANA time zone database]: https://www.iana.org/time-zones
