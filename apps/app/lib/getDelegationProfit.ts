import Decimal from 'decimal.js'
import type {DelegationSnapshot} from './subsquidQuery'

const getDelegationProfit = (
  current: Pick<DelegationSnapshot, 'cost' | 'value'>,
  prev: Pick<DelegationSnapshot, 'cost' | 'value'>,
): Decimal => {
  let profit = new Decimal(current.value)
    .minus(prev.value)
    .minus(current.cost)
    .plus(prev.cost)
  profit = Decimal.max(profit, 0)

  return profit
}

export default getDelegationProfit
