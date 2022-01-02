import {ApiPromise} from '@polkadot/api'
import BN from 'bn.js'
import {karuraParaId} from './config'

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
