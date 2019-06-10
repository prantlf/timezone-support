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

* Tiny code base - 4.6 KB minified, 1.7 KB gzipped. Do not pack unnecessary weight in your application.
* Packed time zone data - 924 KB minified, 33.6 KB gzipped. Single time zones are unpacked on demand.
* Smaller bundles of code with limited data - 1900-2050 (206 kB minified, 25.4 kB gzipped), 1970-2038 (141 kB minified, 15.8 kB gzipped) and 2012-2022 (31.3 KB minified, 8.25 kB gzipped).
* Generated from the official time zone database version 2019a. Canonical time zone names, aliases, UTC offsets, and daylight-saving time changes.
* Minimal interface for time zone lookup and conversions. Parsing, formatting and manipulating dates is usually the task for a higher-level date library.

**Attention**: exported identifiers in vanilla browser modules changed in the version 2.0.0. See the [migration guide] for more information.

### Table of Contents

- [Synopsis](#synopsis)
- [Installation and Getting Started](#installation-and-getting-started)
- [Usage Scenarios](./docs/usage.md#usage-scenarios)
- [Design Concepts](./docs/design.md#design-concepts)
- [API Reference](./docs/API.md#api-reference)
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

// Convert a date to a specific time zone: { year, month, day, dayOfWeek,
// hours, minutes, seconds, milliseconds, epoch, zone: { abbreviation, offset } }
const nativeDate = new Date()
const berlinTime = getZonedTime(nativeDate, berlin)

// Convert a time from a specific time zone: native Date object
const berlinTime = { year: 2018, month: 9, day: 2, hours: 10, minutes: 0 }
const nativeDate = new Date(getUnixTime(berlinTime, berlin))
```

## Installation and Getting Started

This module can be installed in your project using [NPM] or [Yarn]. Make sure, that you use [Node.js] version 6 or newer.

```sh
$ npm i timezone-support --save
```

```sh
$ yarn add timezone-support
```

Functions are exposed as named exports from the package modules, for example:

```js
const { findTimeZone, getZonedTime } = require('timezone-support')
```

You can read more about the [module loading](./docs/API.md#loading) in other environments, like with ES6 or in web browsers. [Usage scenarios](./docs/usage.md#usage-scenarios) demonstrate applications of this library in typical real-world scenarios. [Design concepts](./docs/design.md#design-concepts) explain the approach to time zone handling taken by tni library and types of values used ion the interface. [Generating custom time zone data](./docs/usage.md#generate-custom-time-zone-data) will allow you to save the overall package size by limiting the supported year span. Finally, the [API reference](./docs/API.md#api-reference) lists all functions with a description of their functionality.

You can see [complete sample applications] too, which can help you start with integration of this library.

## Library Integrations

* [Day.js] - [timeZone plugin] supplies parsing from and formatting to an arbitrary time zone
* [date-fns] - [date-fns-timezone] provides functions for parsing from and formatting to an arbitrary time zone and time zone conversions for the native `Date` object.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.  Add unit tests for any new or changed functionality. Lint and test your code using Grunt.

## Release History

* 2018-06-11   v2.0.2   Upgrade the time zone database to the version 2019a.
* 2018-06-11   v2.0.1   Default to midnight, if the time part of a date is missing.
* 2018-06-10   v2.0.0   Use proper identifiers in vanilla browser modules.
* 2018-11-17   v1.8.0   Include time zone data for years 1970-2038.
* 2018-11-17   v1.7.0   Include full time zone data separately loadable.
* 2018-11-06   v1.6.0   Upgrade the time zone database to the version 2018g.
* 2018-10-08   v1.5.5   Fix compatibility with IE. Thanks, [Andrii](https://github.com/AndriiDidkivsky)!
* 2018-10-06   v1.5.0   Add TypeScript export declarations.
* 2018-09-30   v1.4.0   Add limited data for just the current decade - years 2012-2022.
* 2018-09-18   v1.3.0   Maintain the property dayOfWeek in the time object.
* 2018-09-16   v1.2.0   Add a new getUTCOffset method for more lightweight integrations.
* 2018-09-03   v1.1.0   Set the property epoch to the time object.
* 2018-09-02   v1.0.0   Initial release

## License

Copyright (c) 2018-2019 Ferdinand Prantl

Licensed under the MIT license.

[Node.js]: http://nodejs.org/
[NPM]: https://www.npmjs.com/
[RequireJS]: https://requirejs.org/
[Day.js]: https://github.com/iamkun/dayjs
[date-fns]: https://github.com/date-fns/date-fns
[timeZone plugin]: https://github.com/prantlf/dayjs/blob/combined/docs/en/Plugin.md#timezone
[date-fns-timezone]: https://github.com/prantlf/date-fns-timezone
[migration guide]: docs/migration.md#migration-from-1x-to-2x
[complete sample applications]: examples#readme
