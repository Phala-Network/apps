import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import {LoadingButton} from '@mui/lab'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {validateAddress} from '@phala/util'
import {useAtom} from 'jotai'
import {FC, useMemo, useState} from 'react'

const ClaimReward: FC<{
  basePool?: {id: string}
  basePools?: {id: string}[]
  onClose: () => void
}> = ({basePool, basePools, onClose}) => {
  const [account] = useAtom(polkadotAccountAtom)
  const api = usePolkadotApi()
  const signAndSend = useSignAndSend()
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState('')

  const addressValid = useMemo(() => validateAddress(address), [address])

  const claimReward = () => {
    if (!api || (!basePool && !basePools)) return
    const getExtrinsic = (id: string) =>
      api.tx.phalaStakePoolv2.claimOwnerRewards(id, address)
    let extrinsic
    if (basePool) {
      extrinsic = getExtrinsic(basePool.id)
    } else if (basePools) {
      extrinsic =
        basePools.length === 1
          ? getExtrinsic(basePools[0].id)
          : api.tx.utility.batch(basePools.map(({id}) => getExtrinsic(id)))
    }
    if (!extrinsic) return
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
      <DialogTitle>Claim Owner Reward</DialogTitle>

      <DialogContent>
        <TextField
          label="Target Address"
          multiline
          rows={2}
          fullWidth
          InputProps={{
            endAdornment: !address && (
              <Button
                size="small"
                variant="text"
                sx={{flexShrink: 0}}
                onClick={() => {
                  setAddress(account?.address || '')
                }}
              >
                My Address
              </Button>
            ),
          }}
          disabled={loading}
          value={address}
          size="small"
          onChange={(e) => {
            if (!e.target.validity.patternMismatch) {
              setAddress(e.target.value)
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant="text"
          onClick={() => {
            claimReward()
          }}
          disabled={!addressValid}
          loading={loading}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </>
  )
}

export default ClaimReward
