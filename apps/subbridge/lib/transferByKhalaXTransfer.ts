import {AssetId, ASSETS} from '@/config/asset'
import {ChainId, CHAINS} from '@/config/chain'
import type {ApiPromise} from '@polkadot/api'
import {u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'
import Decimal from 'decimal.js'

const moonriverParaId = CHAINS.moonriver.paraId
const karuraParaId = CHAINS.karura.paraId
const bifrostParaId = CHAINS.bifrost.paraId

const extrinsicIds: {[assetId in AssetId]?: Record<string, unknown>} = {
  pha: {
    Concrete: {
      parents: 0,
      interior: 'Here',
    },
  },
  movr: {
    Concrete: {
      parents: 1,
      interior: {
        X2: [{Parachain: moonriverParaId}, {PalletInstance: 10}],
      },
    },
  },
  kar: {
    Concrete: {
      parents: 1,
      interior: {
        X2: [{Parachain: karuraParaId}, {GeneralKey: '0x0080'}],
      },
    },
  },
  bnc: {
    Concrete: {
      parents: 1,
      interior: {
        X2: [{Parachain: bifrostParaId}, {GeneralKey: '0x0001'}],
      },
    },
  },
  zlk: {
    Concrete: {
      parents: 1,
      interior: {
        X2: [{Parachain: bifrostParaId}, {GeneralKey: '0x0207'}],
      },
    },
  },
}

export const transferByKhalaXTransfer = ({
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
  // FIXME: zlk extrinsic body and fee
  const isTransferringZLKToMoonriver =
    (toChainId === 'moonriver' || toChainId === 'moonbase-alpha') &&
    assetId === 'zlk'
  const decimals = asset.decimals.khala ?? asset.decimals.default
  if (!extrinsicIds[assetId]) {
    throw new Error(`Unsupported asset: ${assetId}`)
  }

  return khalaApi.tx.xTransfer.transfer(
    {
      id: extrinsicIds[assetId],
      fun: {Fungible: amount},
    },
    isToEthereum || isTransferringZLKToMoonriver
      ? {
          parents: 0,
          interior: {
            X3: [
              {GeneralKey: '0x6362'}, // string "cb"
              {GeneralIndex: isToEthereum ? 0 : 2}, // 0 is chainId of ethereum
              {GeneralKey: destinationAccount},
            ],
          },
        }
      : {
          parents: 1,
          interior: {
            X2: [
              {Parachain: toChain.paraId},
              toChain.kind === 'evm'
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
