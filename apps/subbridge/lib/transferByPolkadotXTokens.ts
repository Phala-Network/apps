import {AssetId, ASSETS} from '@/config/asset'
import {ChainId, CHAINS} from '@/config/chain'
import type {ApiPromise} from '@polkadot/api'
import type {SubmittableExtrinsic} from '@polkadot/api/types'
import type {ISubmittableResult} from '@polkadot/types/types'
import {u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'
import Decimal from 'decimal.js'

const khalaParaId = CHAINS.khala.paraId

export const transferByPolkadotXTokens = ({
  polkadotApi,
  assetId,
  amount,
  fromChainId,
  toChainId,
  destinationAccount,
}: {
  polkadotApi: ApiPromise
  assetId: AssetId
  fromChainId: ChainId
  toChainId: ChainId
  amount: string
  destinationAccount: string
}): SubmittableExtrinsic<'promise', ISubmittableResult> => {
  const asset = ASSETS[assetId]
  const toChain = CHAINS[toChainId]
  const decimals = asset.decimals[fromChainId] ?? asset.decimals.default
  const isTransferringBNCFromBifrost =
    (fromChainId === 'bifrost' || fromChainId === 'bifrost-test') &&
    assetId === 'bnc'
  const isToEthereum = toChainId === 'ethereum' || toChainId === 'kovan'
  const isTransferringZLKToMoonriver =
    (toChainId === 'moonriver' || toChainId === 'moonbase-alpha') &&
    assetId === 'zlk'
  const isThroughKhala = isToEthereum || isTransferringZLKToMoonriver

  if (!asset.ormlToken || !toChain.paraId) {
    throw new Error('Transfer missing required parameters')
  }

  return polkadotApi.tx.xTokens.transfer(
    {
      [isTransferringBNCFromBifrost ? 'Native' : 'Token']: asset.ormlToken,
    },
    amount,
    {
      V1: {
        parents: 1,
        interior: isThroughKhala
          ? {
              X4: [
                {Parachain: khalaParaId},
                {GeneralKey: '0x6362'}, // string "cb"
                {GeneralIndex: isToEthereum ? 0 : 2}, // 0 is chainId of ethereum
                {GeneralKey: destinationAccount},
              ],
            }
          : {
              X2: [
                {Parachain: toChain.paraId},
                {
                  AccountId32: {
                    network: 'Any',
                    id: u8aToHex(decodeAddress(destinationAccount)),
                  },
                },
              ],
            },
      },
    },
    Decimal.pow(10, decimals - 3)
      .times(6)
      .toString()
  )
}
