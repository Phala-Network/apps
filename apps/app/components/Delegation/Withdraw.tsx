import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import type {DelegationCommonFragment} from '@/lib/subsquidQuery'
import {barlow} from '@/lib/theme'
import {LoadingButton} from '@mui/lab'
import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material'
import {getDecimalPattern, toCurrency} from '@phala/lib'
import Decimal from 'decimal.js'
import {type FC, useMemo, useState} from 'react'
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

  const onClick = (): void => {
    if (api == null) return
    const shares =
      amountString === delegation.value
        ? new Decimal(delegation.shares).times(1e12).toHex()
        : new Decimal(amountString)
            .div(basePool.sharePrice)
            .times(1e12)
            .floor()
            .toHex()

    const extrinsic = isVault
      ? api.tx.phalaVault.withdraw(basePool.id, shares)
      : api.tx.phalaStakePoolv2.withdraw(
          basePool.id,
          shares,
          delegation.account.basePool?.id ?? null,
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

  const isValid = useMemo(() => {
    try {
      const amount = new Decimal(amountString)
      return amount.lte(delegation.value) && amount.gt(0)
    } catch (err) {
      // noop
    }
    return false
  }, [amountString, delegation.value])

  return (
    <>
      <DialogTitle>Withdraw</DialogTitle>
      <DialogContent>
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

        <ButtonGroup fullWidth size="small" sx={{mt: 2}}>
          <Button
            onClick={() => {
              setAmountString(
                Decimal.min(
                  new Decimal(delegation.basePool.freeValue).toDP(
                    2,
                    Decimal.ROUND_DOWN,
                  ),
                  delegation.value,
                ).toString(),
              )
            }}
          >
            All free
          </Button>
          <Button
            onClick={() => {
              setAmountString(delegation.value)
            }}
          >
            All
          </Button>
        </ButtonGroup>
        <Stack mt={2} spacing={0.5}>
          <Property label="Pool free" size="small">
            {`${toCurrency(basePool.freeValue)} PHA`}
          </Property>
        </Stack>

        {delegation.withdrawingShares !== '0' && (
          <Alert severity="warning" sx={{mt: 2}} icon={false}>
            <AlertTitle>You have a pending withdrawal</AlertTitle>
            Submitting a new withdrawal will cancel the pending withdrawal and
            rejoin the queue.
          </Alert>
        )}
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

export default Withdraw
