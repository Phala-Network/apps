import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSelectedVaultState from '@/hooks/useSelectedVaultState'
import useSignAndSend from '@/hooks/useSignAndSend'
import {BasePoolCommonFragment} from '@/lib/subsquidQuery'
import {barlow} from '@/lib/theme'
import {LoadingButton} from '@mui/lab'
import {Stack, SxProps, TextField, Typography} from '@mui/material'
import {getDecimalPattern} from '@phala/util'
import Decimal from 'decimal.js'
import {FC, useMemo, useState} from 'react'

const DelegateInput: FC<{basePool: BasePoolCommonFragment; sx?: SxProps}> = ({
  basePool,
  sx,
}) => {
  const {kind} = basePool
  const color = kind === 'StakePool' ? 'primary' : 'secondary'
  const api = usePolkadotApi()
  const [loading, setLoading] = useState(false)
  const selectedVaultState = useSelectedVaultState()
  const signAndSend = useSignAndSend()
  const [amountString, setAmountString] = useState('')
  const asAccount = selectedVaultState === null
  const disabled = useMemo(() => {
    return !amountString || selectedVaultState === undefined
  }, [amountString, selectedVaultState])
  const delegate = () => {
    if (!api || selectedVaultState === undefined) return
    const amount = new Decimal(amountString).times(1e12).toString()
    setLoading(true)
    const extrinsic =
      kind === 'StakePool'
        ? api.tx.phalaStakePoolv2.contribute(
            basePool.pid,
            amount,
            asAccount ? null : selectedVaultState.id
          )
        : api.tx.phalaVault.contribute(basePool.pid, amount)

    signAndSend(
      asAccount
        ? api.tx.utility.batchAll([
            // TODO: use current w-pha balance
            api.tx.phalaWrappedBalances.wrap(amount),
            extrinsic,
          ])
        : extrinsic
    )
      .then(() => {
        setAmountString('')
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <Stack sx={sx} spacing={1}>
      <Stack direction="row" spacing={2}>
        <TextField
          placeholder="0.00"
          disabled={loading}
          value={amountString}
          InputProps={{
            endAdornment: 'PHA',
            sx: {fontFamily: barlow.style.fontFamily, fontWeight: 600},
          }}
          inputProps={{inputMode: 'decimal', pattern: getDecimalPattern(12)}}
          sx={{flex: '1 0'}}
          color={color}
          size="small"
          onChange={(e) => {
            if (!e.target.validity.patternMismatch) {
              setAmountString(e.target.value)
            }
          }}
        />
        <LoadingButton
          onClick={() => {
            delegate()
          }}
          disabled={disabled}
          loading={loading}
          color={color}
          variant="contained"
        >
          Delegate
        </LoadingButton>
      </Stack>
      <Stack
        direction="row"
        color="text.secondary"
        pl={0.5}
        alignItems="baseline"
      >
        <Typography variant="caption">Est. delegated APY: </Typography>
        <Typography variant="num7" ml={0.5}>
          85.32%
        </Typography>
      </Stack>
    </Stack>
  )
}

export default DelegateInput
