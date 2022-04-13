import {KaruraToken} from '@/config/asset'
import type {ApiPromise} from '@polkadot/api'
import type {SubmittableExtrinsic} from '@polkadot/api/types'
import type {ISubmittableResult} from '@polkadot/types/types'
import {u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'

export const transferFromKarura = ({
  karuraApi,
  token,
  amount,
  paraId,
  destinationAccount,
}: {
  karuraApi: ApiPromise
  token: KaruraToken
  amount: string
  paraId: number
  destinationAccount: string
}): SubmittableExtrinsic<'promise', ISubmittableResult> => {
  return karuraApi.tx.xTokens.transfer(
    {Token: token},
    amount,
    {
      V1: {
        parents: 1,
        interior: {
          X2: [
            {Parachain: paraId},
            {
              AccountId32: {
                network: 'Any',
                id: u8aToHex(decodeAddress(destinationAccount)),
              },
            },
          ],
        },
      },
    },
    6000000000 // Hardcode
  )
}
