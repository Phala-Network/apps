import {ASSETS, type AssetId} from '@/config/asset'
import {CHAINS, type ChainId} from '@/config/chain'
import type {ApiPromise} from '@polkadot/api'
import type {SubmittableExtrinsic} from '@polkadot/api/types'
import type {ISubmittableResult} from '@polkadot/types/types'
import {u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'
import {createPhalaMultilocation} from './createPhalaMultilocation'
import {type Hex} from './getGeneralKey'

export const transferByPolkadotXTokens = ({
  polkadotApi,
  assetId,
  amount,
  fromChainId,
  toChainId,
  destinationAccount,
  proxy,
}: {
  polkadotApi: ApiPromise
  assetId: AssetId
  fromChainId: ChainId
  toChainId: ChainId
  amount: string
  destinationAccount: string
  proxy?: ChainId
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
    (proxy != null && typeof generalIndex !== 'number')
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
    fromChainId === 'basilisk' ||
    fromChainId === 'astar' ||
    fromChainId === 'shiden' ||
    fromChainId === 'turing'
  ) {
    currencyId = palletAssetId
  } else {
    currencyId = {
      [isTransferringBNCFromBifrost ? 'Native' : 'Token']: asset.ormlToken,
    }
  }

  const isXcmV3 = new Set<ChainId>([
    'bifrost-kusama',
    'bifrost-test',
    'karura',
    'karura-test',
    'parallel-heiko',
    'astar',
    'shiden',
    'turing',
  ]).has(fromChainId)

  const palletName =
    fromChainId === 'astar' || fromChainId === 'shiden' ? 'xtokens' : 'xTokens'

  return polkadotApi.tx[palletName].transfer(
    currencyId,
    amount,
    {
      [isXcmV3 ? 'V3' : 'V1']: {
        parents: 1,
        interior:
          proxy != null
            ? {
                X4: [
                  {Parachain: CHAINS[proxy].paraId},
                  ...createPhalaMultilocation(
                    'cb',
                    generalIndex as number,
                    destinationAccount as Hex,
                  ),
                ],
              }
            : {
                X2: [
                  {Parachain: toChain.paraId},
                  {
                    AccountId32: {
                      id: u8aToHex(decodeAddress(destinationAccount)),
                      network: isXcmV3 ? undefined : 'Any',
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
        fromChainId === 'karura' ||
        fromChainId === 'shiden' ||
        fromChainId === 'astar'
      ? {Unlimited: null}
      : '6000000000',
  )
}
