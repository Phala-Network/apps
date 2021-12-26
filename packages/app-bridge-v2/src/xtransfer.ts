import {ApiPromise, WsProvider} from '@polkadot/api'
import BN from 'bn.js'

const khalaParaId = 2004
const karuraParaId = 2000

export function transferPHAFromKhalaToKarura(
  khalaApi: ApiPromise,
  sender: any,
  recipient: any,
  amount: BN,
  callback?: (message: string) => void
) {
  callback?.(`From ${sender.address} to ${recipient.address}`)
  callback?.(`Transfer PHA from Khala to Karura...`)
  return khalaApi?.tx?.xcmTransfer
    ?.transferNative?.(
      khalaApi.createType('XcmV1MultiLocation', {
        parents: 1,
        interior: khalaApi.createType('Junctions', {
          X2: [
            khalaApi.createType('XcmV1Junction', {
              Parachain: khalaApi.createType('Compact<U32>', karuraParaId),
            }),
            khalaApi.createType('XcmV1Junction', {
              AccountId32: {
                network: khalaApi.createType('XcmV0JunctionNetworkId', 'Any'),
                id: '0x' + Buffer.from(recipient.publicKey).toString('hex'),
              },
            }),
          ],
        }),
      }),
      amount,
      6000000000
    )
    .signAndSend(sender, (result: any) => {
      callback?.(`Transfer PHA from Khala to Karura: ${result.status}`)
    })
}

export function transferPHAFromKaruraToKhala(
  karuraApi: ApiPromise,
  sender: any,
  recipient: any,
  amount: BN,
  callback?: (message: string) => void
) {
  callback?.(`From ${sender.address} to ${recipient.address}`)
  callback?.(`Transfer PHA from Karura to Khala...`)
  callback?.(`Recipient.publicKey: ${recipient.publicKey}`)
  return karuraApi?.tx?.xTokens
    ?.transfer?.(
      karuraApi.createType('AcalaPrimitivesCurrencyCurrencyId', {
        // 170 is PHA registered in kurura runtime
        Token: karuraApi.createType('AcalaPrimitivesCurrencyTokenSymbol', 170),
      }),
      amount,
      karuraApi.createType('XcmVersionedMultiLocation', {
        V1: karuraApi.createType('XcmV1MultiLocation', {
          parents: 1,
          interior: karuraApi.createType('Junctions', {
            X2: [
              karuraApi.createType('XcmV1Junction', {
                Parachain: karuraApi.createType('Compact<U32>', khalaParaId),
              }),
              karuraApi.createType('XcmV1Junction', {
                AccountId32: {
                  network: karuraApi.createType(
                    'XcmV0JunctionNetworkId',
                    'Any'
                  ),
                  id: '0x' + recipient.publicKey.toString('hex'),
                },
              }),
            ],
          }),
        }),
      }),
      6000000000
    )
    .signAndSend(sender, (result: any) => {
      callback?.(`Transaction ${result.status}`)
    })
}

export function transferKARFromKaruraToKhala(
  karuraApi: ApiPromise,
  sender: any,
  recipient: any,
  amount: BN,
  callback?: (message: string) => void
) {
  callback?.(`From ${sender.address} to ${recipient.address}`)
  callback?.(`Transfer KAR from Karura to Khala...`)
  return karuraApi?.tx?.xTokens
    ?.transfer?.(
      karuraApi.createType('AcalaPrimitivesCurrencyCurrencyId', {
        // 128 is KAR in kurura runtime
        Token: karuraApi.createType('AcalaPrimitivesCurrencyTokenSymbol', 128),
      }),
      amount,
      karuraApi.createType('XcmVersionedMultiLocation', {
        V1: karuraApi.createType('XcmV1MultiLocation', {
          parents: 1,
          interior: karuraApi.createType('Junctions', {
            X2: [
              karuraApi.createType('XcmV1Junction', {
                Parachain: karuraApi.createType('Compact<U32>', khalaParaId),
              }),
              karuraApi.createType('XcmV1Junction', {
                AccountId32: {
                  network: karuraApi.createType(
                    'XcmV0JunctionNetworkId',
                    'Any'
                  ),
                  id: '0x' + recipient.publicKey.toString('hex'),
                },
              }),
            ],
          }),
        }),
      }),
      6000000000
    )
    .signAndSend(sender, (result: any) => {
      callback?.(`Transaction ${result.status}`)
    })
}

export function transferKARFromKhalaToKarura(
  khalaApi: ApiPromise,
  sender: any,
  recipient: any,
  amount: BN,
  callback?: (message: string) => void
) {
  callback?.(`From ${sender.address} to ${recipient.address}`)
  callback?.(`Transfer KAR from Khala to Karura...`)

  return khalaApi?.tx?.xcmTransfer
    ?.transferAsset?.(
      khalaApi.createType(
        'XtransferPalletsAssetsWrapperPalletXTransferAsset',
        khalaApi.createType('XcmV1MultiLocation', {
          parents: 1,
          interior: khalaApi.createType('Junctions', {
            X2: [
              khalaApi.createType('XcmV1Junction', {
                Parachain: khalaApi.createType('Compact<U32>', karuraParaId),
              }),
              khalaApi.createType('XcmV1Junction', {
                // 0x0080 is general key of KAR defined in karura runtime
                GeneralKey: '0x0080',
              }),
            ],
          }),
        })
      ),
      khalaApi.createType('XcmV1MultiLocation', {
        parents: 1,
        interior: khalaApi.createType('Junctions', {
          X2: [
            khalaApi.createType('XcmV1Junction', {
              Parachain: khalaApi.createType('Compact<U32>', karuraParaId),
            }),
            khalaApi.createType('XcmV1Junction', {
              AccountId32: {
                network: khalaApi.createType('XcmV0JunctionNetworkId', 'Any'),
                id: '0x' + Buffer.from(recipient.publicKey).toString('hex'),
              },
            }),
          ],
        }),
      }),
      amount,
      6000000000
    )
    .signAndSend(sender, (result: any) => {
      callback?.(`Transaction ${result.status}`)
    })
}

// transfer assets except PHA between accounts on khala network
export function transferAssetsKhalaAccounts(
  khalaApi: ApiPromise,
  sender: any,
  recipient: any,
  amount: BN,
  callback?: (message: string) => void
) {
  callback?.(`Transfer KAR between accounts on khala network...`)
  return khalaApi.tx.assets
    .transfer(
      // 0 is assetid that KAR registered on khala network,
      // should confirm this with maintainer before run script
      0,
      recipient.address,
      amount
    )
    .signAndSend(sender, (result: any) => {
      if (result.status.isInBlock) {
        callback?.(
          `Transaction included at blockHash ${result.status.asInBlock}`
        )
      } else if (result.status.isFinalized) {
        callback?.(
          `Transaction finalized at blockHash ${result.status.asFinalized}`
        )
      }
    })
}

export async function getBaseInfo() {
  const khalaEndpoint = 'ws://35.215.162.102:9944'
  const khalaProvider = new WsProvider(khalaEndpoint)
  const khalaApi = await ApiPromise.create({
    provider: khalaProvider,
  })

  const karuraEndpoint = 'ws://35.215.162.102:9955'
  const karuraProvider = new WsProvider(karuraEndpoint)
  const karuraApi = await ApiPromise.create({
    provider: karuraProvider,
  })

  return {
    khalaApi,
    karuraApi,
  }
}
