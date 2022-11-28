import {waitSignAndSend} from '@phala/lib'
import {polkadotAccountAtom} from '@phala/store'
import {SubmittableExtrinsic} from '@polkadot/api/types'
import type {ISubmittableResult} from '@polkadot/types/types'
import {useAtom} from 'jotai'
import {useCallback} from 'react'
import usePolkadotApi from './usePolkadotApi'

const useSignAndSend = () => {
  const api = usePolkadotApi()
  const [account] = useAtom(polkadotAccountAtom)
  const signAndSend = useCallback(
    (extrinsic: SubmittableExtrinsic<'promise', ISubmittableResult>) => {
      if (!account || !api) {
        throw new Error('Account or api is not ready')
      }

      return waitSignAndSend({
        api,
        account: account.address,
        extrinsic,
        signer: account.wallet?.signer,
      }).catch((err) => {
        if (err.message !== 'Cancelled') {
          throw err
        }
      })
    },
    [account, api]
  )
  return signAndSend
}

export default useSignAndSend
