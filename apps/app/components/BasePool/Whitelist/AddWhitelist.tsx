import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import {LoadingButton} from '@mui/lab'
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import {validateAddress} from '@phala/lib'
import {type FC, useMemo, useState} from 'react'

const AddWhitelist: FC<{
  pid: string
  onClose: () => void
}> = ({pid, ...props}) => {
  const api = usePolkadotApi()
  const signAndSend = useSignAndSend()
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState('')
  const isValid = useMemo(() => validateAddress(address), [address])

  const onClick = (): void => {
    if (api == null) return
    const extrinsic = api.tx.phalaBasePool.addStakerToWhitelist(pid, address)

    setLoading(true)
    signAndSend(extrinsic)
      .then(() => {
        props.onClose()
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <DialogTitle>Add Whitelist</DialogTitle>
      <DialogContent>
        <TextField
          label="Address"
          autoFocus
          disabled={loading}
          fullWidth
          multiline
          rows={2}
          value={address}
          size="small"
          onChange={(e) => {
            setAddress(e.target.value)
          }}
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton
          disabled={!isValid}
          loading={loading}
          variant="text"
          onClick={onClick}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </>
  )
}

export default AddWhitelist
