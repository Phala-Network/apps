import {AssetId} from '@/config/asset'
import {ChainId, CHAINS} from '@/config/chain'
import type {ApiPromise} from '@polkadot/api'
import {u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'

const moonriverParaId = CHAINS.moonriver.paraId
const karuraParaId = CHAINS.karura.paraId
const bifrostParaId = CHAINS.bifrost.paraId
const parallelHeikoParaId = CHAINS['parallel-heiko'].paraId
const basiliskParaId = CHAINS.basilisk.paraId
const turingParaId = CHAINS.turing.paraId
const calamariParaId = CHAINS.calamari.paraId

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
  ausd: {
    Concrete: {
      parents: 1,
      interior: {
        X2: [{Parachain: karuraParaId}, {GeneralKey: '0x0081'}],
      },
    },
  },
  hko: {
    Concrete: {
      parents: 1,
      interior: {
        X2: [{Parachain: parallelHeikoParaId}, {GeneralKey: 'HKO'}],
      },
    },
  },
  bsx: {
    Concrete: {
      parents: 1,
      interior: {
        X2: [{Parachain: basiliskParaId}, {GeneralIndex: 0}],
      },
    },
  },
  tur: {
    Concrete: {
      parents: 1,
      interior: {
        X1: {Parachain: turingParaId},
      },
    },
  },
  kma: {
    Concrete: {
      parents: 1,
      interior: {
        X1: {Parachain: calamariParaId},
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
  const toChain = CHAINS[toChainId]
  const isToEthereum = toChainId === 'ethereum' || toChainId === 'kovan'
  const isTransferringZLKToMoonriver =
    (toChainId === 'moonriver' || toChainId === 'moonbase-alpha') &&
    assetId === 'zlk'
  const generalIndex = toChain.kind === 'evm' ? toChain.generalIndex : null
  if (!extrinsicIds[assetId]) {
    throw new Error(`Unsupported asset: ${assetId}`)
  }

  const isThroughChainBridge = isToEthereum || isTransferringZLKToMoonriver

  if (isThroughChainBridge && typeof generalIndex !== 'number') {
    throw new Error('Transfer missing required parameters')
  }

  return khalaApi.tx.xTransfer.transfer(
    {
      id: extrinsicIds[assetId],
      fun: {Fungible: amount},
    },
    {
      parents: isThroughChainBridge ? 0 : 1,
      interior: isThroughChainBridge
        ? {
            X3: [
              {GeneralKey: '0x6362'}, // string "cb"
              {GeneralIndex: generalIndex},
              {GeneralKey: destinationAccount},
            ],
          }
        : {
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
    isThroughChainBridge
      ? null // No need to specify a certain weight if transfer will not through XCM
      : '6000000000'
  )
}
