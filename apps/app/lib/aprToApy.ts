import Decimal from 'decimal.js'

const n = 365

const aprToApy = (apr: Decimal) => apr.div(n).plus(1).pow(n).minus(1)

export default aprToApy
