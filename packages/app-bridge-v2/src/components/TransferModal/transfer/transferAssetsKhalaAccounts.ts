import {ApiPromise} from '@polkadot/api'
import BN from 'bn.js'

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
    .signAndSend(sender, {nonce: -1}, (result: any) => {
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
