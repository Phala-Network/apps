import {ApiPromise} from '@polkadot/api'
import BN from 'bn.js'
import {karuraParaId} from './config'

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
