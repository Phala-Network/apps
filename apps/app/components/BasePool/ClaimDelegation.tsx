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
import type {ISubmittableResult} from '@polkadot/types/types'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {type FC, useMemo, useState} from 'react'

interface ClaimablePool {
  id: string
  vault?: {claimableOwnerShares: string} | null
}

const ClaimDelegation: FC<{
  basePool?: ClaimablePool
  basePools?: ClaimablePool[]
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
      pool: ClaimablePool,
    ): SubmittableExtrinsic<'promise', ISubmittableResult> | undefined => {
      if (pool.vault != null) {
        return api.tx.phalaVault.claimOwnerShares(
          pool.id,
          address,
          new Decimal(pool.vault.claimableOwnerShares).times(1e12).toHex(),
        )
      }
    }
    let extrinsic:
      | SubmittableExtrinsic<'promise', ISubmittableResult>
      | undefined
    if (basePool != null) {
      extrinsic = getExtrinsic(basePool)
    } else if (basePools != null) {
      extrinsic =
        basePools.length === 1
          ? getExtrinsic(basePools[0])
          : api.tx.utility.batch(
              basePools.map((pool) => getExtrinsic(pool)).filter(Boolean),
            )
    }
    if (extrinsic === undefined) {
      return
    }
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
      <DialogTitle>Claim Delegation</DialogTitle>

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

export default ClaimDelegation
