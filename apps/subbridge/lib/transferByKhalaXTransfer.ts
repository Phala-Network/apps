import {AssetId} from '@/config/asset'
import {ChainId, CHAINS} from '@/config/chain'
import type {ApiPromise} from '@polkadot/api'
import {u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'

const moonriverParaId = CHAINS.moonriver.paraId
const karuraParaId = CHAINS.karura.paraId
const bifrostParaId = CHAINS.bifrost.paraId
const parallelParaId = CHAINS.parallel.paraId
const parallelHeikoParaId = CHAINS['parallel-heiko'].paraId
const basiliskParaId = CHAINS.basilisk.paraId
const turingParaId = CHAINS.turing.paraId
const calamariParaId = CHAINS.calamari.paraId
const crabParaId = CHAINS.crab.paraId
const moonbeamParaId = CHAINS.moonbeam.paraId
const shidenParaId = CHAINS.shiden.paraId

const assetConcreteId: {
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
      interior: {X2: [{Parachain: parallelParaId}, {GeneralKey: 'PARA'}]},
    },
  },
  khala: {
    pha: {parents: 0, interior: 'Here'},
    movr: {
      parents: 1,
      interior: {X2: [{Parachain: moonriverParaId}, {PalletInstance: 10}]},
    },
    kar: {
      parents: 1,
      interior: {X2: [{Parachain: karuraParaId}, {GeneralKey: '0x0080'}]},
    },
    bnc: {
      parents: 1,
      interior: {X2: [{Parachain: bifrostParaId}, {GeneralKey: '0x0001'}]},
    },
    zlk: {
      parents: 1,
      interior: {X2: [{Parachain: bifrostParaId}, {GeneralKey: '0x0207'}]},
    },
    ausd: {
      parents: 1,
      interior: {X2: [{Parachain: karuraParaId}, {GeneralKey: '0x0081'}]},
    },
    hko: {
      parents: 1,
      interior: {X2: [{Parachain: parallelHeikoParaId}, {GeneralKey: 'HKO'}]},
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
}) => {
  const toChain = CHAINS[toChainId]
  const isToEthereum = toChainId === 'ethereum' || toChainId === 'kovan'
  const isTransferringZLKToMoonriver =
    (toChainId === 'moonriver' || toChainId === 'moonbase-alpha') &&
    assetId === 'zlk'
  const generalIndex = toChain.kind === 'evm' ? toChain.generalIndex : null

  const concreteId = assetConcreteId[fromChainId]?.[assetId]
  if (!concreteId) {
    throw new Error(`Unsupported asset: ${assetId}`)
  }

  const isThroughChainBridge = isToEthereum || isTransferringZLKToMoonriver

  if (isThroughChainBridge && typeof generalIndex !== 'number') {
    throw new Error('Transfer missing required parameters')
  }

  return api.tx.xTransfer.transfer(
    {
      id: {Concrete: concreteId},
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
