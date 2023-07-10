import {ASSETS, type AssetId} from '@/config/asset'
import {CHAINS, type ChainId} from '@/config/chain'
import type {ApiPromise} from '@polkadot/api'
import type {SubmittableExtrinsic} from '@polkadot/api/types'
import type {ISubmittableResult} from '@polkadot/types/types'
import {u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'
import getGeneralKey, {type Hex} from './getGeneralKey'

const khalaParaId = CHAINS.khala.paraId

export const transferByPolkadotXTokens = ({
  polkadotApi,
  assetId,
  amount,
  fromChainId,
  toChainId,
  destinationAccount,
  isThroughKhala = false,
}: {
  polkadotApi: ApiPromise
  assetId: AssetId
  fromChainId: ChainId
  toChainId: ChainId
  amount: string
  destinationAccount: string
  isThroughKhala?: boolean
}): SubmittableExtrinsic<'promise', ISubmittableResult> => {
  const asset = ASSETS[assetId]
  const toChain = CHAINS[toChainId]
  const shouldUsePalletAssetId =
    fromChainId === 'parallel' ||
    fromChainId === 'parallel-heiko' ||
    fromChainId === 'calamari' ||
    fromChainId === 'basilisk'
  const palletAssetId = asset.palletAssetId?.[fromChainId]
  const isTransferringBNCFromBifrost =
    (fromChainId === 'bifrost-kusama' || fromChainId === 'bifrost-test') &&
    assetId === 'bnc'
  const generalIndex = toChain.kind === 'evm' ? toChain.generalIndex : null

  if (
    (shouldUsePalletAssetId
      ? palletAssetId === undefined
      : asset.ormlToken === undefined) ||
    toChain.paraId == null ||
    (isThroughKhala && typeof generalIndex !== 'number')
  ) {
    throw new Error('Transfer missing required parameters')
  }

  let currencyId

  if (fromChainId === 'calamari') {
    currencyId = {
      MantaCurrency: palletAssetId,
    }
  } else if (
    fromChainId === 'parallel' ||
    fromChainId === 'parallel-heiko' ||
    fromChainId === 'basilisk'
  ) {
    currencyId = palletAssetId
  } else if (fromChainId === 'turing') {
    currencyId = asset.palletAssetId?.turing
  } else {
    currencyId = {
      [isTransferringBNCFromBifrost ? 'Native' : 'Token']: asset.ormlToken,
    }
  }

  return polkadotApi.tx.xTokens.transfer(
    currencyId,
    amount,
    fromChainId === 'bifrost-kusama' ||
      fromChainId === 'bifrost-test' ||
      fromChainId === 'karura' ||
      fromChainId === 'karura-test'
      ? {
          V3: {
            parents: 1,
            interior: isThroughKhala
              ? {
                  X4: [
                    {Parachain: khalaParaId},
                    {GeneralKey: getGeneralKey('0x6362')},
                    {GeneralIndex: generalIndex},
                    {GeneralKey: getGeneralKey(destinationAccount as Hex)},
                  ],
                }
              : {
                  X2: [
                    {Parachain: toChain.paraId},
                    {
                      AccountId32: {
                        id: u8aToHex(decodeAddress(destinationAccount)),
                      },
                    },
                  ],
                },
          },
        }
      : {
          V1: {
            parents: 1,
            interior: isThroughKhala
              ? {
                  X4: [
                    {Parachain: khalaParaId},
                    {GeneralKey: '0x6362'}, // string "cb"
                    {GeneralIndex: generalIndex},
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
    fromChainId === 'bifrost-kusama' || fromChainId === 'bifrost-test'
      ? {Limited: {refTime: '6000000000', proofSize: '1000000'}}
      : fromChainId === 'parallel' ||
        fromChainId === 'parallel-heiko' ||
        fromChainId === 'karura'
      ? {Unlimited: null}
      : '6000000000'
  )
}
