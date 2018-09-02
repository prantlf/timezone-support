const createSuite = require('./createSuite')

function padToTwo (number) {
  return number > 9 ? number : '0' + number
}

function padToThree (number) {
  return number > 99 ? number : number > 9 ? '0' + number : '00' + number
}

function padToFour (number) {
  return number > 999 ? number : number > 99 ? '0' + number : number > 9 ? '00' + number : '000' + number
}

const padToN = [ undefined, undefined, padToTwo, padToThree, padToFour ]

function padWithZeros (number, length) {
  return padToN[length](number)
}

function fillWithZeros (number, targetLength) {
  number = number.toString()
  const zerosToFill = targetLength - number.length
  const padding = Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1)
  return padding + number
}

createSuite('Formatting a string with a local time...')
  .add('fillWithZeros 4 0', () => fillWithZeros(1987, 4))
  .add('padWithZeros 4 0', () => padWithZeros(1987, 4))
  .add('fillWithZeros 4 1', () => fillWithZeros(987, 4))
  .add('padWithZeros 4 1', () => padWithZeros(987, 4))
  .add('fillWithZeros 4 2', () => fillWithZeros(87, 4))
  .add('padWithZeros 4 2', () => padWithZeros(87, 4))
  .add('fillWithZeros 4 3', () => fillWithZeros(7, 4))
  .add('padWithZeros 4 3', () => padWithZeros(7, 4))
  .add('fillWithZeros 3 0', () => fillWithZeros(234, 3))
  .add('padWithZeros 3 0', () => padWithZeros(234, 3))
  .add('fillWithZeros 3 1', () => fillWithZeros(34, 3))
  .add('padWithZeros 3 1', () => padWithZeros(34, 3))
  .add('fillWithZeros 3 2', () => fillWithZeros(4, 3))
  .add('padWithZeros 3 2', () => padWithZeros(4, 3))
  .add('fillWithZeros 2 0', () => fillWithZeros(12, 2))
  .add('padWithZeros 2 0', () => padWithZeros(12, 2))
  .add('fillWithZeros 2 1', () => fillWithZeros(2, 2))
  .add('padWithZeros 2 1', () => padWithZeros(2, 2))
  .start()
