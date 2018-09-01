import unpack from './unpack'

let zones
let names
let links
let instances

function initializeTimeZones (data) {
  zones = {}
  names = data.zones.map(packed => {
    const name = packed.substr(0, packed.indexOf('|'))
    zones[name] = packed
    return name
  })
  links = data.links.reduce((result, packed) => {
    const [ name, alias ] = packed.split('|')
    result[alias] = name
    return result
  }, {})
  instances = {}
}

function listTimeZones () {
  return names
}

function findTimeZone (alias) {
  const name = links[alias] || alias
  let timeZone = instances[name]
  if (!timeZone) {
    const packed = zones[name]
    if (!packed) {
      throw new Error(`Unknown time zone "${name}".`)
    }
    timeZone = instances[name] = unpack(packed)
  }
  return timeZone
}

const utc = {
  name: 'Etc/UTC',
  abbreviations: [ 'UTC' ],
  offsets: [ 0 ],
  untils: [ Infinity ],
  population: 0
}

function getUTC () {
  return utc
}

function addTimeZone (input) {
  const timeZone = typeof input === 'string' ? unpack(input) : input
  const { name } = timeZone
  names.push(name)
  names.sort()
  return instances[name] = timeZone // eslint-disable-line no-return-assign
}

function linkTimeZone (input) {
  const [ name, alias ] = input === 'string' ? input.split('|') : input
  links[alias] = name
}

export default {
  initializeTimeZones, listTimeZones, findTimeZone, getUTC, addTimeZone, linkTimeZone
}
