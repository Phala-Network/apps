import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSelectedVaultState from '@/hooks/useSelectedVaultState'
import useSignAndSend from '@/hooks/useSignAndSend'
import {DelegationCommonFragment} from '@/lib/subsquidQuery'
import {barlow} from '@/lib/theme'
import {LoadingButton} from '@mui/lab'
import {
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  TextField,
} from '@mui/material'
import {getDecimalPattern, toCurrency} from '@phala/util'
import Decimal from 'decimal.js'
import {FC, useState} from 'react'
import Property from '../Property'

const Withdraw: FC<{
  delegation: DelegationCommonFragment
  onClose: () => void
}> = ({delegation, onClose}) => {
  const {basePool} = delegation
  const isVault = basePool.kind === 'Vault'
  const api = usePolkadotApi()
  const signAndSend = useSignAndSend()
  const [loading, setLoading] = useState(false)
  const [amountString, setAmountString] = useState('')
  const [withdrawAll, setWithdrawAll] = useState(false)
  const selectedVaultState = useSelectedVaultState()

  const onClick = () => {
    if (!api || selectedVaultState === undefined) return
    const shares = withdrawAll
      ? new Decimal(delegation.shares).times(1e12).toHex()
      : new Decimal(amountString).div(basePool.sharePrice).floor().toHex()

    const extrinsic = isVault
      ? api.tx.phalaVault.withdraw(basePool.id, shares)
      : api.tx.phalaStakePoolv2.withdraw(
          basePool.id,
          shares,
          selectedVaultState === null ? null : selectedVaultState.id
        )

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
      <DialogTitle>Withdraw</DialogTitle>
      <DialogContent>
        <FormControlLabel
          control={
            <Checkbox
              checked={withdrawAll}
              onChange={(e) => {
                setWithdrawAll(e.target.checked)
              }}
            />
          }
          label="Withdraw All"
        />

        {!withdrawAll && (
          <TextField
            autoFocus
            disabled={loading}
            fullWidth
            placeholder="0.00"
            value={amountString}
            InputProps={{
              endAdornment: 'PHA',
              sx: {fontFamily: barlow.style.fontFamily, fontWeight: 600},
            }}
            inputProps={{inputMode: 'decimal', pattern: getDecimalPattern(12)}}
            size="small"
            onChange={(e) => {
              if (!e.target.validity.patternMismatch) {
                setAmountString(e.target.value)
              }
            }}
          />
        )}
        <Stack mt={2} spacing={0.5}>
          <Property label="Pool Free Value" size="small">
            {`${toCurrency(basePool.freeValue)} PHA`}
          </Property>
        </Stack>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={loading}
          variant="text"
          onClick={onClick}
          disabled={!amountString && !withdrawAll}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </>
  )
}

export default Withdraw
