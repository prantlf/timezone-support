import lookup from './lookup'
import convert from './convert'
import data from './data'

const { initializeTimeZones, listTimeZones, getTimeZone, addTimeZone, linkTimeZone } = lookup

initializeTimeZones(data)

export default { listTimeZones, getTimeZone, addTimeZone, linkTimeZone, ...convert }
