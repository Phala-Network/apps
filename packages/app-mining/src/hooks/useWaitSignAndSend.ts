import {usePolkadotAccountAtom} from '@phala/app-store'
import {decodeAddress, encodeAddress} from '@polkadot/keyring'
import {useApiPromise, waitSignAndSend} from '@phala/react-libs'
import {SubmittableExtrinsic} from '@polkadot/api/types'
import {ExtrinsicStatus} from '@polkadot/types/interfaces'
import {ISubmittableResult} from '@polkadot/types/types'
import {toast} from 'react-toastify'

// Temporary abstraction for mining due to time limit
const useWaitSignAndSend = (): ((
  extrinsic: SubmittableExtrinsic<'promise', ISubmittableResult> | undefined,
  onstatus?: (status: ExtrinsicStatus) => void
) => Promise<
  | (typeof waitSignAndSend extends (...args: any) => Promise<infer U>
      ? U
      : never)
  | void
>) => {
  const [polkadotAccount] = usePolkadotAccountAtom()
  const {api} = useApiPromise()

  return async (extrinsic, onstatus) => {
    if (!api || !polkadotAccount || !extrinsic) return
    const web3FromAddress = (await import('@polkadot/extension-dapp'))
      .web3FromAddress
    // TEST: imtoken
    const account = encodeAddress(decodeAddress(polkadotAccount.address), 0)
    console.log(account) // eslint-disable-line
    const signer = (await web3FromAddress(account)).signer

    return waitSignAndSend({
      api,
      account,
      extrinsic,
      signer,
      onstatus,
    })
      .then((res) => {
        toast.success('Success')
        return res
      })
      .catch((err) => {
        toast.error(err?.message)
        throw err
      })
  }
}

export default useWaitSignAndSend
