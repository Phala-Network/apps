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
import {validateAddress} from '@phala/lib'
import {polkadotAccountAtom} from '@phala/store'
import type {SubmittableExtrinsic} from '@polkadot/api/types'
import {decodeAddress, encodeAddress} from '@polkadot/keyring'
import type {ISubmittableResult} from '@polkadot/types/types'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {type FC, useMemo, useState} from 'react'

interface BasePoolWithOwnerReward {
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

  const claimReward = (): void => {
    if (api == null || (basePool == null && basePools == null)) return
    const getExtrinsic = (
      id: string,
    ): SubmittableExtrinsic<'promise', ISubmittableResult> =>
      api.tx.phalaStakePoolv2.claimOwnerRewards(id, address)
    const calls = []
    let totalReward = new Decimal(0)
    if (basePool != null) {
      calls.push(getExtrinsic(basePool.id))
      if (basePool.stakePool != null) {
        totalReward = totalReward.plus(basePool.stakePool.ownerReward)
      }
    } else if (basePools != null) {
      calls.push(...basePools.map(({id}) => getExtrinsic(id)))
      for (const {stakePool} of basePools) {
        if (stakePool != null) {
          totalReward = totalReward.plus(stakePool.ownerReward)
        }
      }
    }
    try {
      if (
        account?.address !== undefined &&
        encodeAddress(decodeAddress(address), 30) === account.address
      ) {
        calls.push(
          api.tx.phalaWrappedBalances.unwrap(totalReward.times(1e12).toHex()),
        )
      }
    } catch (err) {
      // noop
    }
    setLoading(true)
    signAndSend(calls.length === 1 ? calls[0] : api.tx.utility.batchAll(calls))
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
          inputProps={{pattern: '^[0-9a-zA-Z]*$'}}
          InputProps={{
            endAdornment: address === '' && (
              <Button
                size="small"
                variant="text"
                sx={{flexShrink: 0}}
                onClick={() => {
                  setAddress(account?.address ?? '')
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
