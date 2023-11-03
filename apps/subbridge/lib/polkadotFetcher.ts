import {type AssetId, type CurrencyTokenSymbol} from '@/config/asset'
import {type BridgeKind} from '@/config/bridge'
import {CHAINS, type ChainId} from '@/config/chain'
import type {ApiPromise} from '@polkadot/api'
import Decimal from 'decimal.js'
import {transferByPhalaXTransfer} from './transferByPhalaXTransfer'
import {transferByPolkadotXTokens} from './transferByPolkadotXTokens'

const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
const BLACK_HOLE = '0x0000000000000000000000000000000000000000'

export const polkadotAvailableBalanceFetcher = async ([api, address]: [
  ApiPromise,
  string,
]): Promise<Decimal> => {
  const allBalance = await api.derive.balances.all(address)

  return new Decimal(allBalance.availableBalance.toJSON()).div(
    Decimal.pow(10, api.registry.chainDecimals[0]),
  )
}

export const assetPalletBalanceFetcher = async ([
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
]: [
  ApiPromise,
  string,
  CurrencyTokenSymbol | {Token: CurrencyTokenSymbol} | number,
  number,
]): Promise<Decimal> => {
  const balance = await polkadotApi.query.tokens.accounts(address, token)

  return new Decimal((balance.toJSON() as {free: number}).free).div(
    Decimal.pow(10, decimals),
  )
}

export const xTokensPartialFeeFetcher = async ([
  polkadotApi,
  fromChainId,
  toChainId,
  assetId,
  proxy,
]: [ApiPromise, ChainId, ChainId, AssetId, ChainId]): Promise<Decimal> => {
  const {partialFee} = await transferByPolkadotXTokens({
    polkadotApi,
    assetId,
    amount: '1',
    fromChainId,
    toChainId,
    destinationAccount: ALICE,
    proxy,
  }).paymentInfo(ALICE)

  const decimals = polkadotApi.registry.chainDecimals[0]

  return new Decimal(partialFee.toString()).div(Decimal.pow(10, decimals))
}

export const phalaXTransferPartialFeeFetcher = async ([
  api,
  fromChainId,
  toChainId,
  assetId,
  kind,
]: [ApiPromise, ChainId, ChainId, AssetId, BridgeKind]): Promise<Decimal> => {
  const toChain = CHAINS[toChainId]
  const extrinsic = transferByPhalaXTransfer({
    api,
    amount: '1',
    destinationAccount: toChain.kind === 'substrate' ? ALICE : BLACK_HOLE,
    fromChainId,
    toChainId,
    assetId,
    kind,
  })
  const decimals = api.registry.chainDecimals[0]
  const {partialFee} = await extrinsic.paymentInfo(ALICE)
  return new Decimal(partialFee.toString()).div(Decimal.pow(10, decimals))
}
