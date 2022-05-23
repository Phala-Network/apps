import {AssetId, KaruraToken} from '@/config/asset'
import {ChainId, CHAINS} from '@/config/chain'
import type {ApiPromise} from '@polkadot/api'
import Decimal from 'decimal.js'
import {transferFromKarura} from './transferFromKarura'
import {transferFromKhala} from './transferFromKhala'

const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
const BLACK_HOLE = '0x0000000000000000000000000000000000000000'

export const polkadotAvailableBalanceFetcher = async (
  api: ApiPromise,
  address: string
) => {
  const allBalance = await api.derive.balances.all(address)

  return new Decimal(allBalance.availableBalance.toJSON()).div(
    Decimal.pow(10, api.registry.chainDecimals[0])
  )
}

export const khalaTokenBalanceFetcher = async (
  khalaApi: ApiPromise,
  address: string,
  palletId: number,
  decimals: number
) => {
  const balance = await khalaApi.query.assets.account(palletId, address)
  const balanceJson = balance.toJSON()
  if (!balanceJson) {
    return new Decimal(0)
  }
  return new Decimal((balanceJson as {balance: number}).balance).div(
    Decimal.pow(10, decimals)
  )
}

export const karuraTokenBalanceFetcher = async (
  karuraApi: ApiPromise,
  address: string,
  token: KaruraToken,
  decimals: number
) => {
  const balance = await karuraApi.query.tokens.accounts(address, {Token: token})

  return new Decimal((balance.toJSON() as {free: number}).free).div(
    Decimal.pow(10, decimals)
  )
}

export const khalaToEthereumBridgeFeeFetcher = async (khalaApi: ApiPromise) => {
  const fee = await khalaApi.query.chainBridge.bridgeFee(0)

  return new Decimal((fee.toJSON() as [number, number])[0]).div(
    Decimal.pow(10, 12)
  )
}

export const karuraPartialFeeFetcher = async (
  karuraApi: ApiPromise,
  token: KaruraToken,
  paraId: number
) => {
  const {partialFee} = await transferFromKarura({
    karuraApi,
    token,
    amount: '1',
    paraId,
    destinationAccount: ALICE,
  }).paymentInfo(ALICE)

  const decimals = karuraApi.registry.chainDecimals[0]

  return new Decimal(partialFee.toString()).div(Decimal.pow(10, decimals))
}

export const khalaPartialFeeFetcher = async (
  khalaApi: ApiPromise,
  toChainId: ChainId,
  assetId: AssetId
) => {
  const toChain = CHAINS[toChainId]
  const extrinsic = transferFromKhala({
    khalaApi,
    amount: '1',
    destinationAccount: toChain.kind === 'polkadot' ? ALICE : BLACK_HOLE,
    toChainId,
    assetId,
  })
  if (extrinsic) {
    const decimals = khalaApi.registry.chainDecimals[0]
    const {partialFee} = await extrinsic.paymentInfo(ALICE)
    return new Decimal(partialFee.toString()).div(Decimal.pow(10, decimals))
  }
}
