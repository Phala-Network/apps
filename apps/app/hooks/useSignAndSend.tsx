import {Box, CircularProgress, Stack, Typography} from '@mui/material'
import {waitSignAndSend} from '@phala/lib'
import {polkadotAccountAtom} from '@phala/store'
import type {SubmittableExtrinsic} from '@polkadot/api/types'
import type {ISubmittableResult} from '@polkadot/types/types'
import {useAtom} from 'jotai'
import {type SnackbarKey, useSnackbar} from 'notistack'
import {useCallback} from 'react'
import usePolkadotApi from './usePolkadotApi'

const useSignAndSend = (): ((
  extrinsic: SubmittableExtrinsic<'promise', ISubmittableResult>,
) => Promise<void>) => {
  const api = usePolkadotApi()
  const [account] = useAtom(polkadotAccountAtom)
  const {enqueueSnackbar, closeSnackbar} = useSnackbar()
  const signAndSend = useCallback(
    async (extrinsic: SubmittableExtrinsic<'promise', ISubmittableResult>) => {
      if (account == null || api == null) {
        throw new Error('Account or api is not ready')
      }
      const section = extrinsic.method.section.toString()
      const method = extrinsic.method.method.toString()
      const name = `${section}.${method}`

      let snackbarKey: SnackbarKey

      await new Promise<void>((resolve, reject) => {
        waitSignAndSend({
          api,
          account: account.address,
          extrinsic,
          signer: account.wallet?.signer,
          onReady: () => {
            snackbarKey = enqueueSnackbar(
              <Stack direction="row" alignItems="center" spacing={2}>
                <CircularProgress size={30} disableShrink color="secondary" />
                <Box>
                  <Box>{name}</Box>
                  <Typography variant="caption" component="div">
                    Broadcast
                  </Typography>
                </Box>
              </Stack>,
              {persist: true, variant: 'default'},
            )
            resolve()
          },
        })
          .then(() => {
            closeSnackbar(snackbarKey)
            enqueueSnackbar(
              <Box>
                <Box>{name}</Box>
                <Typography variant="caption" component="div">
                  In Block
                </Typography>
              </Box>,
              {variant: 'success'},
            )
          })
          .catch((err) => {
            reject(err)
            closeSnackbar(snackbarKey)
            if (err.message != null && err.message !== 'Cancelled') {
              enqueueSnackbar(
                <Box>
                  <Box>{name}</Box>
                  <Typography variant="caption" component="div">
                    {err.message}
                  </Typography>
                </Box>,
                {
                  autoHideDuration: 6000,
                  variant: 'error',
                  style: {maxWidth: '400px'},
                },
              )
            }
          })
      })
    },
    [account, api, enqueueSnackbar, closeSnackbar],
  )
  return signAndSend
}

export default useSignAndSend
