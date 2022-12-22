import Decimal from 'decimal.js'
import {BasePool, Vault} from './subsquidQuery'

const getVaultOwnerCut = (
  basePool: Pick<BasePool, 'sharePrice' | 'commission' | 'totalShares'> & {
    vault?: Pick<Vault, 'lastSharePriceCheckpoint'> | null
  }
) => {
  const {vault, sharePrice, commission, totalShares} = basePool
  if (!vault) return new Decimal(0)
  const {lastSharePriceCheckpoint} = vault
  return Decimal.max(
    new Decimal(sharePrice)
      .minus(lastSharePriceCheckpoint)
      .times(commission)
      .times(totalShares)
      .div(
        new Decimal(sharePrice).minus(
          new Decimal(sharePrice)
            .minus(lastSharePriceCheckpoint)
            .times(commission)
        )
      )
      .times(sharePrice),
    0
  )
}

export default getVaultOwnerCut
