import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSelectedVaultState from '@/hooks/useSelectedVaultState'
import useSignAndSend from '@/hooks/useSignAndSend'
import {BasePoolCommonFragment, BasePoolKind} from '@/lib/subsquid'
import {barlow} from '@/lib/theme'
import {LoadingButton} from '@mui/lab'
import {Stack, SxProps, TextField} from '@mui/material'
import {getDecimalPattern} from '@phala/util'
import {FC, useMemo, useState} from 'react'

const DelegateInput: FC<{basePool: BasePoolCommonFragment; sx?: SxProps}> = ({
  basePool,
  sx,
}) => {
  const {kind} = basePool
  const color = kind === BasePoolKind.StakePool ? 'primary' : 'secondary'
  const api = usePolkadotApi()
  const [loading, setLoading] = useState(false)
  const selectedVaultState = useSelectedVaultState()
  const signAndSend = useSignAndSend()
  const [amount, setAmount] = useState('')
  const asAccount = selectedVaultState === null
  const disabled = useMemo(() => {
    return !amount || selectedVaultState === undefined
  }, [amount, selectedVaultState])
  const delegate = () => {
    if (!api || selectedVaultState === undefined) return
    setLoading(true)
    const extrinsic =
      kind === BasePoolKind.StakePool
        ? api.tx.phalaStakePoolv2.contribute(
            basePool.pid,
            amount,
            asAccount ? null : selectedVaultState.id
          )
        : api.tx.phalaVault.contribute(basePool.pid, amount)

    signAndSend(extrinsic).finally(() => {
      setLoading(false)
    })
  }
  return (
    <Stack direction="row" spacing={2} sx={sx}>
      <TextField
        placeholder="0.00"
        disabled={loading}
        value={amount}
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
            setAmount(e.target.value)
          }
        }}
        helperText={''}
      />
      <LoadingButton
        onClick={() => {
          delegate()
        }}
        disabled={disabled}
        loading={loading}
        color={color}
        variant="contained"
        size="small"
      >
        Delegate
      </LoadingButton>
    </Stack>
  )
}

export default DelegateInput
