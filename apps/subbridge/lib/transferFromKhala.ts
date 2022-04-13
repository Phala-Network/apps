import {AssetId} from '@/config/asset'
import {ChainId, CHAINS} from '@/config/chain'
import type {ApiPromise} from '@polkadot/api'
import {u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'

function getPhaAssetId(khalaApi: ApiPromise) {
  const khalaParaId = 2004
  return khalaApi.createType('XcmV1MultiassetAssetId', {
    Concrete: khalaApi.createType('XcmV1MultiLocation', {
      parents: 1,
      interior: khalaApi.createType('Junctions', {
        X1: khalaApi.createType('XcmV1Junction', {
          Parachain: khalaApi.createType('Compact<U32>', khalaParaId),
        }),
      }),
    }),
  })
}

export const transferFromKhala = ({
  khalaApi,
  amount,
  toChainId,
  destinationAccount,
  assetId,
}: {
  khalaApi: ApiPromise
  amount: string
  toChainId: ChainId
  destinationAccount: string
  assetId: AssetId
}) => {
  if (
    toChainId === 'ethereum' ||
    (toChainId === 'rinkeby' && assetId === 'pha')
  ) {
    return khalaApi.tx.xTransfer.transfer(
      khalaApi.createType('XcmV1MultiAsset', {
        id: getPhaAssetId(khalaApi),
        fun: khalaApi.createType('XcmV1MultiassetFungibility', {
          Fungible: khalaApi.createType('Compact<U128>', amount),
        }),
      }),
      khalaApi.createType('XcmV1MultiLocation', {
        parents: 0,
        interior: khalaApi.createType('Junctions', {
          X3: [
            khalaApi.createType('XcmV1Junction', {
              GeneralKey: '0x6362', // string "cb"
            }),
            khalaApi.createType('XcmV1Junction', {
              GeneralIndex: 0, // 0 is chainid of ethereum
            }),
            khalaApi.createType('XcmV1Junction', {
              GeneralKey: destinationAccount,
            }),
          ],
        }),
      }),
      null // No need to specify a certain weight if transfer will not through XCM
    )
  }

  if (toChainId === 'karura' || toChainId === 'karura-test') {
    const toChain = CHAINS[toChainId]

    return khalaApi.tx.xTransfer.transfer(
      khalaApi.createType('XcmV1MultiAsset', {
        id: getPhaAssetId(khalaApi),
        fun: khalaApi.createType('XcmV1MultiassetFungibility', {
          Fungible: khalaApi.createType('Compact<U128>', amount),
        }),
      }),
      khalaApi.createType('XcmV1MultiLocation', {
        parents: 1,
        interior: khalaApi.createType('Junctions', {
          X2: [
            khalaApi.createType('XcmV1Junction', {
              Parachain: khalaApi.createType('Compact<U32>', toChain.paraId),
            }),
            khalaApi.createType('XcmV1Junction', {
              AccountId32: {
                network: khalaApi.createType('XcmV0JunctionNetworkId', 'Any'),
                id: u8aToHex(decodeAddress(destinationAccount)),
              },
            }),
          ],
        }),
      }),
      6000000000
    )
  }
}
