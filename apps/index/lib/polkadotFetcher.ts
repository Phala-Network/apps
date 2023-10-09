import type {ApiPromise} from '@polkadot/api'
import Decimal from 'decimal.js'

// const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
// const BLACK_HOLE = '0x0000000000000000000000000000000000000000'

export const polkadotAvailableBalanceFetcher = async ([api, address]: [
  ApiPromise,
  string,
]): Promise<Decimal> => {
  const account = (await api.query.system.account(address)) as any

  return new Decimal(account.data.free.toJSON()).div(
    Decimal.pow(10, api.registry.chainDecimals[0]),
  )
}

export const palletAssetBalanceFetcher = async ([
  polkadotApi,
  address,
  palletAssetId,
  decimals,
]: [ApiPromise, string, number, number]): Promise<Decimal> => {
  const balance = await polkadotApi.query.assets.account(palletAssetId, address)
  const balanceJson = balance.toJSON()
  if (balanceJson == null) {
    return new Decimal(0)
  }
  return new Decimal((balanceJson as {balance: number}).balance).div(
    Decimal.pow(10, decimals),
  )
}

export const ormlTokenBalanceFetcher = async ([
  polkadotApi,
  address,
  token,
  decimals,
]: [ApiPromise, string, {Token: string}, number]): Promise<Decimal> => {
  const balance = await polkadotApi.query.tokens.accounts(address, token)

  return new Decimal((balance.toJSON() as {free: number}).free).div(
    Decimal.pow(10, decimals),
  )
}
