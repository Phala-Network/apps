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
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {FC, useMemo, useState} from 'react'

type BasePoolWithOwnerReward = {
  id: string
  stakePool?: {
    ownerReward: string
  } | null
}

const ClaimReward: FC<{
  basePool?: BasePoolWithOwnerReward
  basePools?: BasePoolWithOwnerReward[]
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
    const calls = []
    let totalReward = new Decimal(0)
    if (basePool) {
      calls.push(getExtrinsic(basePool.id))
      if (basePool.stakePool) {
        totalReward = totalReward.plus(basePool.stakePool.ownerReward)
      }
    } else if (basePools) {
      calls.push(...basePools.map(({id}) => getExtrinsic(id)))
      for (const {stakePool} of basePools) {
        if (stakePool) {
          totalReward = totalReward.plus(stakePool.ownerReward)
        }
      }
    }
    calls.push(
      api.tx.phalaWrappedBalances.unwrap(totalReward.times(1e12).toHex())
    )
    setLoading(true)
    signAndSend(api.tx.utility.batchAll(calls))
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
          onClick={claimReward}
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
