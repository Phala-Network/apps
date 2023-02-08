import Decimal from 'decimal.js'

const n = 365

export const aprToApy = (apr: Decimal): Decimal =>
  apr.div(n).plus(1).pow(n).minus(1)
export const apyToApr = (apy: Decimal): Decimal =>
  apy.plus(1).pow(new Decimal(1).div(n)).minus(1).times(n)
