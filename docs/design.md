# Design Concepts

The purpose of this library is to offer an efficient support for time zone handling in the smallest package.

* Lightweight - nothing else is included. Thus serving well for other date & time libraries, but also for applications, which do not manipulate dates.
* Tiny - use packed time zone data, unpacked on demand. Compromise between loading time and being ready to use immediately.
* Reliable - generated from the fresh official time zone database version 2022f. Canonical time zone names, aliases, UTC offsets, and daylight-saving time changes.
* Customizable - named exports and functions divided to separate modules allow tree-shaking. Alternative time zone data can be supplied to reduce the library size.

### Table of Contents

- [Basics](#basics)
- [UNIX Timestamp](#unix-timestamp)
- [Time Object](#time-object)

## Basics

The interface is built around two value types:

1. UNIX timestamp for a date in UTC
2. Time object for a date in an arbitrary time zone

## UNIX Timestamp

The *UNIX timestamp* can be used to create a native `Date` object instance, or it can be obtained from it by calling `date.prototype.getTime`. It serves well as a common way how to represent a date in UTC. (The UNIX timestamp used in this library is the epoch time in milliseconds, not in seconds, to be compatible with the interface of the native `Date` object.)

The UNIX timestamp is returned by the function [`getUnixTime`](./API.md#getunixtime) converting from an arbitrary time zone to UTC.

## Time Object

The *time object* is used to carry a date and information about an arbitrary time zone. The native `Date` object cannot include the time zone information with the date.

```js
{
  year: 2018,
  month: 9,
  day: 25,
  hours: 9,
  minutes: 30,
  seconds: 45,
  milliseconds: 273,
  epoch: 1537860645273,
  dayOfWeek: 2,
  zone: {
    abbreviation: 'CEST',
    offset: -120
  }
}
```

The following properties are expected in an *incomplete time object*, usually set from the user input or by the function [`parseZonedTime`](./API.md#parsezonedtime). The properties `seconds` and `milliseconds` are optional and will be considered as set to zero, if they are missing.

* `year` (Number) - full year number, as returned by `Date.prototype.getFullYear`
* `month` (Number) - month number starting from 1 (January); not as returned by `Date.prototype.getMonth`, which returns a zero-based month index
* `day` (Number) - day of the month number starting from 1, as returned by `Date.prototype.getDate`
* `hours` (Number) - elapsed hours within a day starting from 0, as returned by `Date.prototype.getHours`
* `minutes` (Number) - elapsed minutes within n hour starting from 0, as returned by `Date.prototype.getMinutes`
* `seconds` (Number) - elapsed seconds within a minute starting from 0, as returned by `Date.prototype.getSeconds`
* `milliseconds` (Number) - elapsed milliseconds within a second starting from 0, as returned by `Date.prototype.getMilliseconds`

The following properties are added to a *complete time object*, usually set by conversion function [`getZonedTime`](./API.md#getzonedtime) and [`setZonedTime`](./API.md#setzonedtime).

* `dayOfWeek` (Number) - day of the week number starting from 0 (Sunday), as returned by `Date.prototype.getDay`
* `epoch` (Number) - elapsed milliseconds from the UNIX epoch (UTC), as returned by `Date.prototype.getTime`
* `zone` (Object) - information about the time zone for the day stored in the time object
* `zone.abbreviation` (String) - time zone abbreviation for the day stored in the time object
* `zone.offset` (Number) - difference between UTC and the time zone of the time object in minutes, as `Date.prototype.getTimezoneOffset` would return it, if it supported arbitrary time zones

The property `zone.offset` has the opposite sign, than the time zone offset formatted in displayable strings. For example, its value for "CEST+02:00" is -120. If this offset is subtracted from the UNIX timestamp in UTC, you will get the epoch time in the given time zone. Similarly, if you have an epoch time in a specific time zone, adding the `zone.offset` to it will convert it to UTC.
