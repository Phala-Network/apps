import {ApiPromise} from '@polkadot/api'
import BN from 'bn.js'
import {khalaParaId} from '../../../config'

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
    .signAndSend(sender, {nonce: -1}, (result: any) => {
      callback?.(`Transaction ${result.status}`)
    })
}