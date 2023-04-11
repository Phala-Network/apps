import {type AssetId, type OrmlToken} from '@/config/asset'
import {CHAINS, type ChainId} from '@/config/chain'
import type {ApiPromise} from '@polkadot/api'
import Decimal from 'decimal.js'
import {transferByKhalaXTransfer} from './transferByKhalaXTransfer'
import {transferByPolkadotXTokens} from './transferByPolkadotXTokens'
import {transferByPolkadotXcm} from './transferByPolkadotXcm'

const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
const BLACK_HOLE = '0x0000000000000000000000000000000000000000'

export const polkadotAvailableBalanceFetcher = async ([api, address]: [
  ApiPromise,
  string
]): Promise<Decimal> => {
  const allBalance = await api.derive.balances.all(address)

  return new Decimal(allBalance.availableBalance.toJSON()).div(
    Decimal.pow(10, api.registry.chainDecimals[0])
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
    Decimal.pow(10, decimals)
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
  OrmlToken | {Token: OrmlToken} | number,
  number
]): Promise<Decimal> => {
  const balance = await polkadotApi.query.tokens.accounts(address, token)

  return new Decimal((balance.toJSON() as {free: number}).free).div(
    Decimal.pow(10, decimals)
  )
}

export const khalaToEthereumBridgeFeeFetcher = async (
  khalaApi: ApiPromise
): Promise<Decimal> => {
  const fee = await khalaApi.query.chainBridge.bridgeFee(0)

  return new Decimal(fee.toJSON() as number).div(Decimal.pow(10, 12))
}

export const xTokensPartialFeeFetcher = async ([
  polkadotApi,
  fromChainId,
  toChainId,
  assetId,
  isThroughKhala,
]: [ApiPromise, ChainId, ChainId, AssetId, boolean]): Promise<Decimal> => {
  const {partialFee} = await transferByPolkadotXTokens({
    polkadotApi,
    assetId,
    amount: '1',
    fromChainId,
    toChainId,
    destinationAccount: ALICE,
    isThroughKhala,
  }).paymentInfo(ALICE)

  const decimals = polkadotApi.registry.chainDecimals[0]

  return new Decimal(partialFee.toString()).div(Decimal.pow(10, decimals))
}

export const khalaXTransferPartialFeeFetcher = async ([
  api,
  fromChainId,
  toChainId,
  assetId,
]: [ApiPromise, ChainId, ChainId, AssetId]): Promise<Decimal> => {
  const toChain = CHAINS[toChainId]
  const extrinsic = transferByKhalaXTransfer({
    api,
    amount: '1',
    destinationAccount: toChain.kind === 'polkadot' ? ALICE : BLACK_HOLE,
    fromChainId,
    toChainId,
    assetId,
  })
  const decimals = api.registry.chainDecimals[0]
  const {partialFee} = await extrinsic.paymentInfo(ALICE)
  return new Decimal(partialFee.toString()).div(Decimal.pow(10, decimals))
}

export const polkadotXcmTransferPartialFeeFetcher = async ([
  polkadotApi,
  fromChainId,
  toChainId,
  assetId,
]: [ApiPromise, ChainId, ChainId, AssetId]): Promise<Decimal> => {
  const extrinsic = transferByPolkadotXcm({
    polkadotApi,
    amount: '1',
    destinationAccount: ALICE,
    fromChainId,
    toChainId,
    assetId,
  })
  const decimals = polkadotApi.registry.chainDecimals[0]
  const {partialFee} = await extrinsic.paymentInfo(ALICE)
  return new Decimal(partialFee.toString()).div(Decimal.pow(10, decimals))
}
