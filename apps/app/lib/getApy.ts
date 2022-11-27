import {toFixed} from '@phala/util'
import Decimal from 'decimal.js'

const n = 365

const getApy = (aprString: string) =>
  `${toFixed(
    new Decimal(aprString).div(n).plus(1).pow(n).minus(1).times(100),
    2
  )}%`

export default getApy
