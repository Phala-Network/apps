import usePolkadotApi from '@/hooks/usePolkadotApi'
// import useSignAndSend from '@/hooks/useSignAndSend'
import {BasePoolCommonFragment} from '@/lib/subsquidQuery'
import {LoadingButton} from '@mui/lab'
import {DialogActions, DialogContent, DialogTitle} from '@mui/material'
import {FC, useState} from 'react'

const SetProperties: FC<{
  basePool: BasePoolCommonFragment
  onClose: () => void
}> = () => {
  const api = usePolkadotApi()
  // const signAndSend = useSignAndSend()
  const [loading, setLoading] = useState(false)

  const onClick = () => {
    if (!api) return
    setLoading(true)
  }

  return (
    <>
      <DialogTitle></DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <LoadingButton loading={loading} variant="text" onClick={onClick}>
          Submit
        </LoadingButton>
      </DialogActions>
    </>
  )
}

export default SetProperties
