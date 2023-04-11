import {type AssetId} from '@/config/asset'
import {CHAINS, type ChainId} from '@/config/chain'
import type {ApiPromise} from '@polkadot/api'
import {type SubmittableExtrinsic} from '@polkadot/api/types'
import {type ISubmittableResult} from '@polkadot/types/types'
import {u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'

const moonriverParaId = CHAINS.moonriver.paraId
const karuraParaId = CHAINS.karura.paraId
const bifrostKusamaParaId = CHAINS['bifrost-kusama'].paraId
const parallelParaId = CHAINS.parallel.paraId
const parallelHeikoParaId = CHAINS['parallel-heiko'].paraId
const basiliskParaId = CHAINS.basilisk.paraId
const turingParaId = CHAINS.turing.paraId
const calamariParaId = CHAINS.calamari.paraId
const crabParaId = CHAINS.crab.paraId
const moonbeamParaId = CHAINS.moonbeam.paraId
const shidenParaId = CHAINS.shiden.paraId
const astarParaId = CHAINS.astar.paraId

type Hex = `0x${string}`

const getGeneralKey = (hex: Hex): {length: number; data: Hex} => {
  return {
    length: (hex.length - 2) / 2,
    data: `${hex}${'0'.repeat(66 - hex.length)}`,
  }
}

const assetConcrete: {
  [fromChainId in ChainId]?: {[assetId in AssetId]?: Record<string, unknown>}
} = {
  phala: {
    pha: {parents: 0, interior: 'Here'},
    glmr: {
      parents: 1,
      interior: {X2: [{Parachain: moonbeamParaId}, {PalletInstance: 10}]},
    },
    para: {
      parents: 1,
      interior: {
        X2: [
          {Parachain: parallelParaId},
          {GeneralKey: getGeneralKey('0x50415241')}, // string "PARA"
        ],
      },
    },
    astr: {parents: 1, interior: {X1: {Parachain: astarParaId}}},
  },
  khala: {
    pha: {parents: 0, interior: 'Here'},
    movr: {
      parents: 1,
      interior: {X2: [{Parachain: moonriverParaId}, {PalletInstance: 10}]},
    },
    kar: {
      parents: 1,
      interior: {
        X2: [{Parachain: karuraParaId}, {GeneralKey: getGeneralKey('0x0080')}],
      },
    },
    bnc: {
      parents: 1,
      interior: {
        X2: [
          {Parachain: bifrostKusamaParaId},
          {GeneralKey: getGeneralKey('0x0001')},
        ],
      },
    },
    zlk: {
      parents: 1,
      interior: {
        X2: [
          {Parachain: bifrostKusamaParaId},
          {GeneralKey: getGeneralKey('0x0207')},
        ],
      },
    },
    ausd: {
      parents: 1,
      interior: {
        X2: [{Parachain: karuraParaId}, {GeneralKey: getGeneralKey('0x0081')}],
      },
    },
    hko: {
      parents: 1,
      interior: {
        X2: [
          {Parachain: parallelHeikoParaId},
          {GeneralKey: getGeneralKey('0x484b4f')}, // string "HKO"
        ],
      },
    },
    bsx: {
      parents: 1,
      interior: {X2: [{Parachain: basiliskParaId}, {GeneralIndex: 0}]},
    },
    tur: {parents: 1, interior: {X1: {Parachain: turingParaId}}},
    kma: {parents: 1, interior: {X1: {Parachain: calamariParaId}}},
    crab: {
      parents: 1,
      interior: {X2: [{Parachain: crabParaId}, {PalletInstance: 5}]},
    },
    sdn: {parents: 1, interior: {X1: {Parachain: shidenParaId}}},
  },
}

export const transferByKhalaXTransfer = ({
  api,
  amount,
  fromChainId,
  toChainId,
  destinationAccount,
  assetId,
}: {
  api: ApiPromise
  amount: string
  fromChainId: ChainId
  toChainId: ChainId
  destinationAccount: string
  assetId: AssetId
}): SubmittableExtrinsic<'promise', ISubmittableResult> => {
  const toChain = CHAINS[toChainId]
  const isToEthereum = toChainId === 'ethereum'
  const isTransferringZLKToMoonriver =
    (toChainId === 'moonriver' || toChainId === 'moonbase-alpha') &&
    assetId === 'zlk'
  const generalIndex = toChain.kind === 'evm' ? toChain.generalIndex : null

  const concrete = assetConcrete[fromChainId]?.[assetId]
  if (concrete == null) {
    throw new Error(`Unsupported asset: ${assetId}`)
  }

  const isThroughChainBridge = isToEthereum || isTransferringZLKToMoonriver

  if (isThroughChainBridge && typeof generalIndex !== 'number') {
    throw new Error('Transfer missing required parameters')
  }

  return api.tx.xTransfer.transfer(
    {
      id: {Concrete: concrete},
      fun: {Fungible: amount},
    },
    {
      parents: isThroughChainBridge ? 0 : 1,
      interior: isThroughChainBridge
        ? {
            X3: [
              {GeneralKey: getGeneralKey('0x6362')}, // string "cb"
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
    isThroughChainBridge
      ? null // No need to specify a certain weight if transfer will not through XCM
      : {refTime: '6000000000', proofSize: '0'}
  )
}
