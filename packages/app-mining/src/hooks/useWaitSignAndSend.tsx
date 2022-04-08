import {useCurrentAccount} from '@phala/app-store'
import {useApiPromise, waitSignAndSend} from '@phala/react-libs'
import {SubmittableExtrinsic} from '@polkadot/api/types'
import {ExtrinsicStatus} from '@polkadot/types/interfaces'
import {ISubmittableResult} from '@polkadot/types/types'
import {DURATION, useSnackbar} from 'baseui/snackbar'
import {XCircle, CheckCircle} from 'react-feather'

// TODO: move to common hooks lib
const useWaitSignAndSend = (): ((
  extrinsic: SubmittableExtrinsic<'promise', ISubmittableResult> | undefined,
  onstatus?: (status: ExtrinsicStatus) => void
) => Promise<
  | (typeof waitSignAndSend extends (...args: any) => Promise<infer U>
      ? U
      : never)
  | void
>) => {
  const {enqueue, dequeue} = useSnackbar()
  const [currentAccount] = useCurrentAccount()
  const {api} = useApiPromise()

  return async (extrinsic, onstatus) => {
    if (!api || !currentAccount?.wallet?.signer || !extrinsic) return

    return waitSignAndSend({
      api,
      account: currentAccount.address,
      extrinsic,
      signer: currentAccount.wallet.signer,
      onstatus: (status) => {
        if (status.isReady) {
          enqueue(
            {
              message: 'Submitting transaction',
              progress: true,
            },
            DURATION.infinite
          )
        }

        onstatus?.(status)
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
