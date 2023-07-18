import Decimal from 'decimal.js'
import {type Delegation, type DelegationSnapshot} from './subsquidQuery'

const getDelegationProfit = (
  delegation: Pick<Delegation, 'cost' | 'value'>,
  snapshot: Pick<DelegationSnapshot, 'cost' | 'value'>,
): Decimal => {
  let profit = new Decimal(delegation.value)
    .minus(snapshot.value)
    .minus(delegation.cost)
    .plus(snapshot.cost)
  profit = Decimal.max(profit, 0)

  return profit
}

export default getDelegationProfit
