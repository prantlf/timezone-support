import lookup from './lookup/lookup'
import convert from './convert/convert'
import iso from './parse-format/iso'
import data from './lookup/data'

const {
  initializeTimeZones, listTimeZones, findTimeZone, getUTC, addTimeZone, linkTimeZone
} = lookup

initializeTimeZones(data)

export default {
  listTimeZones, findTimeZone, getUTC, addTimeZone, linkTimeZone, ...convert, ...iso
}
