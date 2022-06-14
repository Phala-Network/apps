import {useApiPromise, waitSignAndSend} from '@phala/react-libs'
import {useCurrentAccount} from '@phala/store'
import {SubmittableExtrinsic} from '@polkadot/api/types'
import {ExtrinsicStatus} from '@polkadot/types/interfaces'
import {ISubmittableResult} from '@polkadot/types/types'
import {DURATION, useSnackbar} from 'baseui/snackbar'
import {CheckCircle, XCircle} from 'react-feather'

// TODO: move to common hooks lib
const useWaitSignAndSend = (): ((
  extrinsic: SubmittableExtrinsic<'promise', ISubmittableResult> | undefined,
  onStatus?: (status: ExtrinsicStatus) => void
) => Promise<
  | (typeof waitSignAndSend extends (...args: any) => Promise<infer U>
      ? U
      : never)
  | void
>) => {
  const {enqueue, dequeue} = useSnackbar()
  const [currentAccount] = useCurrentAccount()
  const {api} = useApiPromise()

  return async (extrinsic, onStatus) => {
    if (!api || !currentAccount?.wallet?.signer || !extrinsic) return

    return waitSignAndSend({
      api,
      account: currentAccount.address,
      extrinsic,
      signer: currentAccount.wallet.signer,
      onStatus: (status) => {
        if (status.isReady) {
          enqueue(
            {
              message: 'Submitting transaction',
              progress: true,
            },
            DURATION.infinite
          )
        }

        onStatus?.(status)
      },
    })
      .then((res) => {
        dequeue()
        // TODO: add view in subscan button
        enqueue({
          message: 'Transaction in block',
          startEnhancer: ({size}) => <CheckCircle size={size} />,
        })
        return res
      })
      .catch((err) => {
        dequeue()
        enqueue(
          {
            message: err?.message,
            startEnhancer: ({size}) => <XCircle size={size} />,
          },
          DURATION.long
        )
        throw err
      })
  }
}

export default useWaitSignAndSend
