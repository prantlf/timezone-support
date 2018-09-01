function charCodeToInt (charCode) {
  if (charCode > 96) {
    return charCode - 87
  } else if (charCode > 64) {
    return charCode - 29
  }
  return charCode - 48
}

function unpackBase60 (string) {
  const parts = string.split('.')
  const whole = parts[0]
  const fractional = parts[1] || ''
  let multiplier = 1
  let start = 0
  let out = 0
  let sign = 1
  // handle negative numbers
  if (string.charCodeAt(0) === 45) {
    start = 1
    sign = -1
  }
  // handle digits before the decimal
  for (let i = start, length = whole.length; i < length; ++i) {
    const num = charCodeToInt(whole.charCodeAt(i))
    out = (60 * out) + num
  }
  // handle digits after the decimal
  // istanbul ignore next
  for (let i = 0, length = fractional.length; i < length; ++i) {
    const num = charCodeToInt(fractional.charCodeAt(i))
    multiplier = multiplier / 60
    out += num * multiplier
  }
  return out * sign
}

function arrayToInt (array) {
  for (let i = 0, length = array.length; i < length; ++i) {
    array[i] = unpackBase60(array[i])
  }
}

function intToUntil (array, length) {
  for (let i = 0; i < length; ++i) {
    array[i] = Math.round((array[i - 1] || 0) + (array[i] * 60000))
  }
  array[length - 1] = Infinity
}

function mapIndices (source, indices) {
  const out = []
  for (let i = 0, length = indices.length; i < length; ++i) {
    out[i] = source[indices[i]]
  }
  return out
}

function unpack (string) {
  const data = string.split('|')
  let offsets = data[2].split(' ')
  const indices = data[3].split('')
  const untils = data[4].split(' ')

  arrayToInt(offsets)
  arrayToInt(indices)
  arrayToInt(untils)
  intToUntil(untils, indices.length)

  const name = data[0]
  const abbreviations = mapIndices((data[1].split(' ')), indices)
  const population = data[5] | 0
  offsets = mapIndices(offsets, indices)

  return { name, abbreviations, offsets, untils, population }
}

export { unpack }
