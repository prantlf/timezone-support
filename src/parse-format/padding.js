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

export { padWithZeros }
