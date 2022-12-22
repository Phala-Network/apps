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
import {isTruthy, validateAddress} from '@phala/util'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {FC, useMemo, useState} from 'react'

type ClaimablePool = {id: string; vault?: {claimableOwnerShares: string} | null}

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

  const claimReward = () => {
    if (!api || (!basePool && !basePools)) return
    const getExtrinsic = (pool: ClaimablePool) =>
      !!pool.vault &&
      api.tx.phalaVault.claimOwnerShares(
        pool.id,
        address,
        new Decimal(pool.vault.claimableOwnerShares).times(1e12).toHex()
      )
    let extrinsic
    if (basePool) {
      extrinsic = getExtrinsic(basePool)
    } else if (basePools) {
      extrinsic =
        basePools.length === 1
          ? getExtrinsic(basePools[0])
          : api.tx.utility.batch(
              basePools.map((pool) => getExtrinsic(pool)).filter(isTruthy)
            )
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
      <DialogTitle>Claim Delegation</DialogTitle>

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

export default ClaimDelegation
