import {ASSETS, type AssetId, nativeLocation} from '@/config/asset'
import type {BridgeKind} from '@/config/bridge'
import {CHAINS, type ChainId, type SubstrateChain} from '@/config/chain'
import type {ApiPromise} from '@polkadot/api'
import type {SubmittableExtrinsic} from '@polkadot/api/types'
import {u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'
import getGeneralKey, {type Hex} from './getGeneralKey'

export const transferByPhalaXTransfer = ({
  api,
  amount,
  fromChainId,
  toChainId,
  destinationAccount,
  assetId,
  kind,
}: {
  api: ApiPromise
  amount: string
  fromChainId: ChainId
  toChainId: ChainId
  destinationAccount: string
  assetId: AssetId
  kind: BridgeKind
}): SubmittableExtrinsic<'promise'> => {
  const asset = ASSETS[assetId]
  const fromChain = CHAINS[fromChainId] as SubstrateChain
  const toChain = CHAINS[toChainId]
  const isSygma = kind === 'phalaSygma'
  const generalIndex = toChain.kind === 'evm' ? toChain.generalIndex : null

  const location =
    fromChain.nativeAsset === assetId
      ? nativeLocation
      : asset.location?.[fromChain.relayChain]

  if (location == null) {
    throw new Error(`Unsupported asset: ${assetId}`)
  }

  if (isSygma && typeof generalIndex !== 'number') {
    throw new Error('Transfer missing required parameters')
  }

  return api.tx.xTransfer.transfer(
    {
      id: {Concrete: location},
      fun: {Fungible: amount},
    },
    {
      parents: isSygma ? 0 : 1,
      interior: isSygma
        ? {
            X3: [
              {
                GeneralKey: isSygma
                  ? getGeneralKey('0x7379676d61') // string "sygma"
                  : getGeneralKey('0x6362'), // string "cb"
              },
              {GeneralIndex: generalIndex},
              {GeneralKey: getGeneralKey(destinationAccount as Hex)},
            ],
          }
        : {
            X2: [
              {Parachain: toChain.paraId},
              toChain.kind === 'evm'
                ? {AccountKey20: {key: destinationAccount}}
                : {
                    AccountId32: {
                      id: u8aToHex(decodeAddress(destinationAccount)),
                    },
                  },
            ],
          },
    },
    isSygma
      ? null // No need to specify a certain weight if transfer will not through XCM
      : {refTime: '6000000000', proofSize: '1000000'},
  )
}
