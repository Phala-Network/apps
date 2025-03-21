import type {AssetId} from '@/config/asset'
import type {BridgeKind} from '@/config/bridge'
import {CHAINS, type ChainId} from '@/config/chain'
import type {ApiPromise} from '@polkadot/api'
import Decimal from 'decimal.js'
import {transferByPhalaXTransfer} from './transferByPhalaXTransfer'
import {transferByPolkadotXTokens} from './transferByPolkadotXTokens'

const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
const BLACK_HOLE = '0x0000000000000000000000000000000000000000'

export const polkadotNativeBalanceFetcher =
  (polkadotApi?: ApiPromise) =>
  async ([_, address]: [string, string]): Promise<Decimal | undefined> => {
    if (polkadotApi == null) return
    const allBalance = await polkadotApi.derive.balances.all(address)

    return new Decimal(allBalance.availableBalance.toJSON() as string).div(
      Decimal.pow(10, polkadotApi.registry.chainDecimals[0]),
    )
  }

export const polkadotBalanceFetcher =
  (polkadotApi?: ApiPromise) =>
  async ([_, address, assetId, decimals, balanceSource]: [
    string,
    string,
    number,
    number,
    'assetsPallet' | 'tokensPallet',
  ]): Promise<Decimal | undefined> => {
    if (polkadotApi == null) return
    let value: number
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

export const xTokensPartialFeeFetcher =
  (polkadotApi?: ApiPromise) =>
  async ([_, fromChainId, toChainId, assetId, proxy]: [
    string,
    ChainId,
    ChainId,
    AssetId,
    ChainId | undefined,
  ]): Promise<Decimal | undefined> => {
    if (polkadotApi == null) return
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

export const phalaXTransferPartialFeeFetcher =
  (api?: ApiPromise) =>
  async ([_, fromChainId, toChainId, assetId, kind]: [
    string,
    ChainId,
    ChainId,
    AssetId,
    BridgeKind,
  ]): Promise<Decimal | undefined> => {
    if (api == null) return
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
