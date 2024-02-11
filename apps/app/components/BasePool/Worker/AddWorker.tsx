import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import {LoadingButton} from '@mui/lab'
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import {type FC, useMemo, useState} from 'react'

const AddWorker: FC<{
  pid: string
  onClose: () => void
}> = ({onClose, pid}) => {
  const api = usePolkadotApi()
  const signAndSend = useSignAndSend()
  const [loading, setLoading] = useState(false)
  const [workerId, setWorkerId] = useState('')
  const isValid = useMemo(
    () => /^0x[0-9a-fA-F]{64}$/.test(workerId),
    [workerId],
  )

  const onClick = (): void => {
    if (api == null) return
    const extrinsic = api.tx.phalaStakePoolv2.addWorker(pid, workerId)

    setLoading(true)
    signAndSend(extrinsic)
      .then(() => {
        onClose()
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <DialogTitle>Add Worker</DialogTitle>
      <DialogContent>
        <TextField
          label="Worker Pubkey"
          autoFocus
          disabled={loading}
          fullWidth
          multiline
          rows={2}
          placeholder="0x…"
          value={workerId}
          size="small"
          onChange={(e) => {
            setWorkerId(e.target.value)
          }}
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={loading}
          variant="text"
          onClick={onClick}
          disabled={!isValid}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </>
  )
}

export default AddWorker
