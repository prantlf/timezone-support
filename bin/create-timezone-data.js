#!/usr/bin/env node

const { createTimeZoneData } = require('../util/data-creator')

function help() {
  console.log(`Generates time zone data for a selected year range.

Usage: create-timezone-data [options] <first year> <last year>

Options:
  -a|--all-years           includes all available years
  -c|--as-cjs-module       format the time zone data as a CommonJS module
  -d|--as-amd-module       format the time zone data as an AMD module
  -m|--as-module           format the time zone data as a JavaScript module
  -n|--umd-name <name>     UMD global export name, if not "timezoneData"
  -o|--output-file <file>  write the time zone data to a file
  -u|--as-umd-module       format the time zone data as an UMD module
  -V|--version             print version number
  -h|--help                print usage instructions

  Time zone data are printed on the standard output as JSON by default.

Examples:
  $ create-timezone-data 2012 2022
  $ create-timezone-data -m -o custom-data.js 1970 2038`)
  process.exit(0)
}

const { argv } = process
const args = []
let   allYears, asModule, asCjsModule, asAmdModule, asUmdModule, umdName, outputFile

for (let i = 2, l = argv.length; i < l; ++i) {
  const arg = argv[i]
  const match = /^(-|--)(no-)?([a-zA-Z][-a-zA-Z]*)(?:=(.*))?$/.exec(arg)
  if (match) {
    const parseArg = (arg, flag) => {
      switch (arg) {
        case 'a': case 'all-years':
          allYears = flag
          return
        case 'c': case 'as-cjs-module':
          asCjsModule = flag
          return
        case 'd': case 'as-amd-module':
          asAmdModule = flag
          return
        case 'm': case 'as-module':
          asModule = flag
          return
        case 'n': case 'umd-name':
          umdName = match[4] || argv[++i]
          return
        case 'o': case 'output-file':
          outputFile = match[4] || argv[++i]
          return
        case 'u': case 'as-umd-module':
          recursive = flag
          return
        case 'V': case 'version':
          console.log(require('../package.json').version)
          process.exit(0)
          break
        case 'h': case 'help':
          help()
      }
      console.error(`unknown option: "${arg}"`)
      process.exit(1)
    }
    if (match[1] === '-') {
      const flags = match[3].split('')
      for (const flag of flags) parseArg(flag, true)
    } else {
      parseArg(match[3], match[2] !== 'no-')
    }
    continue
  }
  args.push(arg)
}

const [ firstYear, lastYear ] = args
if (!(firstYear && lastYear) && !allYears) help()

createTimeZoneData({
  firstYear,
  lastYear,
  asModule,
  asCjsModule,
  asAmdModule,
  asUmdModule,
  umdName,
  outputFile
})
.then(timeZoneData => {
  if (!outputFile) {
    console.log(timeZoneData)
  }
})
.catch(error => {
  console.error(error.message)
  process.exitCode = 1
})
