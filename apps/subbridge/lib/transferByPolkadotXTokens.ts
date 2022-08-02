import {AssetId, ASSETS} from '@/config/asset'
import {ChainId, CHAINS} from '@/config/chain'
import type {ApiPromise} from '@polkadot/api'
import type {SubmittableExtrinsic} from '@polkadot/api/types'
import type {ISubmittableResult} from '@polkadot/types/types'
import {u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'

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
    fromChainId === 'parallel-heiko' ||
    fromChainId === 'calamari' ||
    fromChainId === 'basilisk'
  const palletAssetId = asset.palletAssetId?.[fromChainId]
  const isTransferringBNCFromBifrost =
    (fromChainId === 'bifrost' || fromChainId === 'bifrost-test') &&
    assetId === 'bnc'
  const generalIndex = toChain.kind === 'evm' ? toChain.generalIndex : null

  if (
    (shouldUsePalletAssetId
      ? palletAssetId === undefined
      : asset.ormlToken === undefined) ||
    !toChain.paraId ||
    (isThroughKhala && typeof generalIndex !== 'number')
  ) {
    throw new Error('Transfer missing required parameters')
  }

  let currencyId

  if (fromChainId === 'calamari') {
    currencyId = {
      MantaCurrency: palletAssetId,
    }
  } else if (fromChainId === 'parallel-heiko' || fromChainId === 'basilisk') {
    currencyId = palletAssetId
  } else if (fromChainId === 'turing') {
    currencyId = assetId === 'tur' ? 'Native' : asset.ormlToken
  } else {
    currencyId = {
      [isTransferringBNCFromBifrost ? 'Native' : 'Token']: asset.ormlToken,
    }
  }

  return polkadotApi.tx.xTokens.transfer(
    currencyId,
    amount,
    {
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
    '6000000000'
  )
}
