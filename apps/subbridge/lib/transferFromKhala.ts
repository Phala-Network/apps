import {AssetId, ASSETS} from '@/config/asset'
import {ChainId, CHAINS} from '@/config/chain'
import type {ApiPromise} from '@polkadot/api'
import {u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'
import Decimal from 'decimal.js'

const moonriverParaId = CHAINS.moonriver.paraId
const karuraParaId = CHAINS.karura.paraId
const bifrostParaId = CHAINS.bifrost.paraId

function getExtrinsicAssetId(assetId: AssetId) {
  if (assetId === 'pha') {
    return {
      Concrete: {
        parents: 0,
        interior: 'Here',
      },
    }
  }

  if (assetId === 'movr') {
    return {
      Concrete: {
        parents: 1,
        interior: {
          X2: [{Parachain: moonriverParaId}, {PalletInstance: 10}],
        },
      },
    }
  }

  if (assetId === 'kar') {
    return {
      Concrete: {
        parents: 1,
        interior: {
          X2: [{Parachain: karuraParaId}, {GeneralKey: '0x0080'}],
        },
      },
    }
  }

  if (assetId === 'bnc') {
    return {
      Concrete: {
        parents: 1,
        interior: {
          X2: [{Parachain: bifrostParaId}, {GeneralKey: '0x0001'}],
        },
      },
    }
  }
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
  const asset = ASSETS[assetId]
  const toChain = CHAINS[toChainId]
  const isToEthereum = toChainId === 'ethereum' || toChainId === 'kovan'
  const decimals = asset.decimals.khala ?? asset.decimals.default

  return khalaApi.tx.xTransfer.transfer(
    {
      id: getExtrinsicAssetId(assetId),
      fun: {Fungible: amount},
    },
    isToEthereum
      ? {
          parents: 0,
          interior: {
            X3: [
              {GeneralKey: '0x6362'}, // string "cb"
              {GeneralIndex: 0}, // 0 is chainId of ethereum
              {GeneralKey: destinationAccount},
            ],
          },
        }
      : {
          parents: 1,
          interior: {
            X2: [
              {Parachain: toChain.paraId},
              toChain.kind === 'evm' && toChain.isSubstrateCompatible
                ? {
                    AccountKey20: {
                      network: 'Any',
                      key: destinationAccount,
                    },
                  }
                : {
                    AccountId32: {
                      network: 'Any',
                      id: u8aToHex(decodeAddress(destinationAccount)),
                    },
                  },
            ],
          },
        },
    isToEthereum
      ? null // No need to specify a certain weight if transfer will not through XCM
      : Decimal.pow(10, decimals - 3)
          .times(6)
          .toString()
  )
}
