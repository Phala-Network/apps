import Decimal from 'decimal.js'
import type {BasePool, Vault} from './subsquidQuery'

const getVaultOwnerCut = (
  basePool: Pick<BasePool, 'sharePrice' | 'commission' | 'totalShares'> & {
    vault?: Pick<Vault, 'lastSharePriceCheckpoint'> | null
  },
): Decimal => {
  const {vault, sharePrice, commission, totalShares} = basePool
  if (vault == null) return new Decimal(0)
  const {lastSharePriceCheckpoint} = vault
  return Decimal.max(
    new Decimal(sharePrice)
      .minus(lastSharePriceCheckpoint)
      .times(commission)
      .times(totalShares),
    0,
  )
}

export default getVaultOwnerCut
