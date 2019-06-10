# Migration from 1.x to 2.x

Names of global variables that expose the exported objects in vanilla JavaScript modules changed. Basically, convert the kebab-case keys exposing the global objects to camelCase. For example: `window['timezone-support']` to `window.timezoneSupport`.

Nothing else changed. File names of scripts in the `dist` directory did not change. The structure of objects exported from these files did not change either. The behaviour of exposed functions did not change.

## Renamed Variables

Names of global variables that expose the exported objects in vanilla JavaScript modules changed. They do not contain hyphens any more and they became valid JavaScript identifiers. It was necessary to satisfy tools, which integrate UMD modules via shims.

| File name       | Old object                        | New object                 |
| :-------------- | :-------------------------------- | :------------------------- |
| index           | window['timezone-support']        | window.timezoneSupport     |
| index-1900-2050 | window['timezone-support']        | window.timezoneSupport     |
| index-1970-2038 | window['timezone-support']        | window.timezoneSupport     |
| index-2012-2022 | window['timezone-support']        | window.timezoneSupport     |
| lookup-convert  | window['timezone-lookup-convert'] | window.timezoneSupport     |
| data            | window['timezone-data']           | window.timezoneData        |
| data-1900-2050  | window['timezone-data-1900-2050'] | window.timezoneData        |
| data-1970-2038  | window['timezone-data-1970-2038'] | window.timezoneData        |
| data-2012-2022  | window['timezone-data-2012-2022'] | window.timezoneData        |
| parse-format    | window['timezone-parse-format']   | window.timezoneParseFormat |

The `lookup-convert` file is meant to be used together with a `data*` file. The name of the object-exposing variable (`timezoneSupport`) can be the same as the one exposed from `index*` files. It allows for easier dependency modifications without additional code changes in dependency sources.

The `data*` files are not meant to be used together; just one of them is supposed to be used with the `lookup-convert` file. The exposing variable name can be the same (`timezoneData`). It allows for easier swapping of data-files when having the exposing variable called always `timezoneData`.

## Change Examples

Replace keys that you used to consume objects exported from files in the `dist` directory:

```js
const { populateTimeZones, findTimeZone, getZonedTime } = window['timezone-lookup-convert']
populateTimeZones(window['timezone-data-1970-2038'])

const berlin = findTimeZone('Europe/Berlin')
const inputDate = new Date('2018-09-01T09:19:17.276Z')
const berlinTime = getZonedTime(inputDate, berlin)
```

with the new keys:

```js
const { populateTimeZones, findTimeZone, getZonedTime } = window.timezoneSupport
populateTimeZones(window.timezoneData)
// The rest of API remains the same.
const berlin = findTimeZone('Europe/Berlin')
const inputDate = new Date('2018-09-01T09:19:17.276Z')
const berlinTime = getZonedTime(inputDate, berlin)
```

And other old keys, for example:

```js
const { findTimeZone, getZonedTime } = window['timezone-support']
const { formatZonedTime } = window['timezone-parse-format']

const zonedTime = { year: 2018, month: 9, day: 2, hours: 10, minutes: 0,
                    zone: { abbreviation: 'CEST', offset: -120 } }
const displayTime = formatZonedTime(zonedTime, 'D.M.YYYY H:mm zZ')
```

with the new keys:

```js
const { findTimeZone, getZonedTime } = window.timezoneSupport
const { formatZonedTime } = window.timezoneParseFormat
// The rest of API remains the same.
const zonedTime = { year: 2018, month: 9, day: 2, hours: 10, minutes: 0,
                    zone: { abbreviation: 'CEST', offset: -120 } }
const displayTime = formatZonedTime(zonedTime, 'D.M.YYYY H:mm zZ')
```
