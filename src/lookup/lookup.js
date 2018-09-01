import { unpack } from './unpack'

let zones
let names
let links
let instances

function populateTimeZones (data) {
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

export { populateTimeZones, listTimeZones, findTimeZone }
