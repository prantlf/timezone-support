# Time Zone Support
[![NPM version](https://badge.fury.io/js/timezone-support.png)](http://badge.fury.io/js/timezone-support)
[![Build Status](https://travis-ci.org/prantlf/timezone-support.png)](https://travis-ci.org/prantlf/timezone-support)
[![Coverage Status](https://coveralls.io/repos/github/prantlf/timezone-support/badge.svg?branch=master)](https://coveralls.io/github/prantlf/timezone-support?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9f1034029c0747a980cd49f64f16338b)](https://www.codacy.com/app/prantlf/timezone-support?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=prantlf/timezone-support&amp;utm_campaign=Badge_Grade)
[![Dependency Status](https://david-dm.org/prantlf/timezone-support.svg)](https://david-dm.org/prantlf/timezone-support)
[![devDependency Status](https://david-dm.org/prantlf/timezone-support/dev-status.svg)](https://david-dm.org/prantlf/timezone-support#info=devDependencies)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![NPM Downloads](https://nodei.co/npm/timezone-support.png?downloads=true&stars=true)](https://www.npmjs.com/package/timezone-support)

Lightweight time zone listing and date converting. Intended for adding time zone support to high-level date libraries, but also for direct application usage.

* Tiny code base - 3.5 KB minified, 1.5 KB gzipped. Do not pack unnecessary weight in your application.
* Packed time zone data - 175 KB minified, 22.5 KB gzipped. Single time zones are unpacked on demand.
* Generated from the official time zone database version 2018e. Canonical time zone names, aliases, UTC offsets, and daylight-saving time changes.
* Minimal interface for time zone lookup and conversions. Parsing, formatting and manipulating dates is usually the task for a higher-level date library.

- [Synopsis](#synopsis)
- [Installation and Loading](#installation-and-loading)
  - [Specific Environments](#specific-environments)
- [Usage Scenarios](#usage-scenarios)
  - [List all available time zones](#list-all-available-time-zones)
  - [Convert a date from UTC to a specific time zone](#convert-a-date-from-utc-to-a-specific-time-zone)
  - [Convert a date from a specific time zone to UTC](#convert-a-date-from-a-specific-time-zone-to-utc)
  - [Format a date/time to a custom string](#format-a-datetime-to-a-custom-string)
  - [Parse a date/time from a custom string](#parse-a-datetime-from-a-custom-string)
  - [Set time zone to a zone-less date](#set-time-zone-to-a-zone-less-date)
  - [Get UTC offset for a specific time zone](#get-utc-offset-for-a-specific-time-zone)
- [API Reference](#api-reference)
- [Library Integrations](#library-integrations)
- [Contributing](#contributing)
- [Release History](#release-history)
- [License](#license)

## Synopsis

```js
const {
  listTimeZones, findTimeZone, getZonedTime, getUnixTime
} = require('timezone-support')

// List canonical time zone names: [ 'Africa/Abidjan', ... ]
const timeZones = listTimeZones()

// Find a particular time zone: { name: 'Europe/Berlin', ... }
const berlin = findTimeZone('Europe/Berlin')

// Convert a date to a specific time zone: { year, month, day, hours,
//   minutes, seconds, milliseconds, zone: { abbreviation, offset } }
const nativeDate = new Date()
const berlinTime = getZonedTime(nativeDate, berlin)

// Convert a time from a specific time zone: native Date object
const berlinTime = { year: 2018, month: 9, day: 2, hours: 10, minutes: 0 }
const nativeDate = new Date(getUnixTime(berlinTime, berlin))
```

## Installation and Loading

This module can be installed in your project using [NPM]. Make sure, that you use [Node.js] version 8 or newer.

```sh
$ npm i timezone-support --save
```

### Specific Environments

Load the main module in an application using CommonJS modules:

```js
const { findTimeZone, getZonedTime } = require('timezone-support')
```

Load the main module in an application using ES6 modules:

```js
import {
  findTimeZone, getZonedTime
} from './node_modules/timezone-support/src/index.js'
```

Load the main module in the browser with plain JavaScript:

```html
<script src="./node_modules/timezone-support/dist/index.umd.js"></script>
<script>
  (() => {
    const { findTimeZone, getZonedTime } = window['timezone-support']
  })()
</script>
```

Load the main module in the browser with [RequireJS]:

```html
<script src="./node_modules/timezone-support/dist/index.umd.js"></script>
<script>
  require(['timezone-support'], ({ findTimeZone, getZonedTime }) => {
  })
</script>
```

## Usage Scenarios

The minimal, but powerful API of this module provides functionality for both date/time-supporting libraries and end-user applications.

### List all available time zones

Users may need to choose the time zone, which they want to see and enter dates in. Time zones can be listed in a dropdown for the user to choose from, for example.

```js
const { listTimeZones } = require('timezone-support')
const timeZones = listTimeZones()
```

See the function [listTimeZones](#listTimeZones) for more information.

### Convert a date from UTC to a specific time zone

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

### Convert a date from a specific time zone to UTC

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

See the function [getUnixTime](#getUnixTime) for more information.

### Format a date/time to a custom string

Some applications let their users freely configure, how dates will be formatted. While date formatting is usually supplied bu higher-level libraries, which support locales and include other functionality to manipulate dates, very simple formatting is available in this library too.

```js
const { formatZonedTime } = require('timezone-support/dist/parse-format')

const zonedTime = { year: 2018, month: 9, day: 2, hours: 10, minutes: 0,
                    zone: { abbreviation: 'CEST', offset: -120 } }
const displayTime = formatZonedTime(zonedTime, 'D.M YYYY H:mm:ss Z')
```

See the function [formatZonedTime](#formatzonedtime) for more information.

### Parse a date/time from a custom string

Some applications let their users freely configure, what date format will be used when parsing strings. While string parsing is usually supplied bu higher-level libraries, which support locales and include other functionality to manipulate dates, very simple parsing is available in this library too.

```js
const { parseZonedTime } = require('timezone-support/dist/parse-format')

const displayTime = '2.9. 2018 10:00 CET+02:00'
const zonedTime = parseZonedTime(displayTime, 'D.M YYYY H:mm:ss Z')
```

See the function [parseZonedTime](#parseZonedTime) for more information.

### Set time zone to a zone-less date

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

See the function [formatZonedTime](#formatzonedtime) for more information.

### Get UTC offset for a specific date and time zone

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

See the function [getUTCOffset](#getutcoffset) for more information.

## API Reference

The API consists of functions only. They are divided to three modules, which you can load depending on your usage scenario.

### timezone-support/dist/index

Main package module. The most usually chosen module with time zone lookup and date conversion functionality. Loads the bundled time zone database automatically. Includes all functions from the emodule `timezone-support/dist/lookup-convert` except for [populateTimeZones](#populatetimezones).

### timezone-support/dist/lookup-convert

Provides the same functions as the module `timezone-support/dist/index`, but does not load the bundled time zone database. You can initialize this library with your own the time zone data.

#### populateTimeZones
#### listTimeZones
#### findTimeZone
#### getUTCOffset
#### getZonedTime
#### getUnixTime
#### setTimeZone

### timezone-support/dist/parse-format

Offers a minimal date parsing and formatting support, if you want to use this library in an end-user application. Recognizes only numeric format tokens and no locale support.

#### parseZonedTime
#### formatZonedTime

## Library Integrations

* [Day.js] - [timeZone plugin] supplies parsing from and formatting to an arbitrary time zone
* [date-fns]

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.  Add unit tests for any new or changed functionality. Lint and test your code using Grunt.

## Release History

* 2018-09-16   v1.1.0   Add a new getUTCOffset method for more lightweight integrations.
* 2018-09-02   v1.0.0   Initial release

## License

Copyright (c) 2018 Ferdinand Prantl

Licensed under the MIT license.

[Node.js]: http://nodejs.org/
[NPM]: https://www.npmjs.com/
[RequireJS]: https://requirejs.org/
[Day.js]: https://github.com/iamkun/dayjs
[date-fns]: https://github.com/date-fns/date-fns
[timeZone plugin]: https://github.com/prantlf/dayjs/blob/combined/docs/en/Plugin.md#timezone
