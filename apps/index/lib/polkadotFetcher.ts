import type {ApiPromise} from '@polkadot/api'
import Decimal from 'decimal.js'

export const polkadotNativeBalanceFetcher = async ([api, address]: [
  ApiPromise,
  string,
]): Promise<Decimal> => {
  const allBalance = await api.derive.balances.all(address)

  return new Decimal(allBalance.availableBalance.toJSON() as string).div(
    Decimal.pow(10, api.registry.chainDecimals[0]),
  )
}

export const polkadotBalanceFetcher = async ([
  polkadotApi,
  address,
  assetId,
  decimals,
  balanceSource,
]: [
  ApiPromise,
  string,
  number,
  number,
  'assetsPallet' | 'tokensPallet',
]): Promise<Decimal> => {
  let value
  if (balanceSource === 'assetsPallet') {
    const balance = await polkadotApi.query.assets.account(assetId, address)
    const balanceJson = balance.toJSON() as {balance: number} | null
    value = balanceJson == null ? 0 : balanceJson.balance
  } else if (balanceSource === 'tokensPallet') {
    const balance = (
      await polkadotApi.query.tokens.accounts(address, assetId)
    ).toJSON() as {free: number}

    value = balance.free
  } else {
    throw new Error('Invalid balance source')
  }

  return new Decimal(value).div(Decimal.pow(10, decimals))
}
