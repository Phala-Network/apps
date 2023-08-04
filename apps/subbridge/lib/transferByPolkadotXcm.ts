import {type AssetId} from '@/config/asset'
import {CHAINS, type ChainId} from '@/config/chain'
import type {ApiPromise} from '@polkadot/api'
import type {SubmittableExtrinsic} from '@polkadot/api/types'
import type {ISubmittableResult} from '@polkadot/types/types'
import {u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'
import {createPhalaMultilocation} from './createPhalaMultilocation'
import {type Hex} from './getGeneralKey'

export const transferByPolkadotXcm = ({
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
  const fromChain = CHAINS[fromChainId]
  const toChain = CHAINS[toChainId]
  const proxyChain = proxy != null ? CHAINS[proxy] : undefined
  let Concrete
  if (fromChainId === 'crab' && assetId === 'crab') {
    Concrete = {parents: 0, interior: {X1: {PalletInstance: 5}}}
  } else if (fromChainId === 'shiden') {
    if (assetId === 'pha') {
      Concrete = {parents: 1, interior: {X1: {Parachain: 2004}}}
    } else if (assetId === 'sdn') {
      Concrete = {parents: 0, interior: 'Here'}
    }
  } else if (fromChainId === 'astar') {
    if (assetId === 'pha') {
      Concrete = {parents: 1, interior: {X1: {Parachain: 2035}}}
    } else if (assetId === 'astr') {
      Concrete = {parents: 0, interior: 'Here'}
    }
  }
  const generalIndex = toChain.kind === 'evm' ? toChain.generalIndex : null

  if (proxy != null && typeof generalIndex !== 'number') {
    throw new Error('Transfer missing required parameters')
  }

  const isNativeAsset = fromChain.nativeAsset === assetId
  const functionName = isNativeAsset
    ? 'reserveTransferAssets'
    : 'reserveWithdrawAssets'

  return polkadotApi.tx.polkadotXcm[functionName](
    {
      V3: {
        parents: 1,
        interior: {
          X1: {
            Parachain: proxyChain == null ? toChain.paraId : proxyChain.paraId,
          },
        },
      },
    },
    {
      V3: {
        parents: 0,
        interior:
          proxy === null
            ? {
                X1: {
                  AccountId32: {
                    id: u8aToHex(decodeAddress(destinationAccount)),
                  },
                },
              }
            : {
                X3: createPhalaMultilocation(
                  'sygma',
                  generalIndex as number,
                  destinationAccount as Hex,
                ),
              },
      },
    },
    {V3: [{id: {Concrete}, fun: {Fungible: amount}}]},
    0,
  )
}
