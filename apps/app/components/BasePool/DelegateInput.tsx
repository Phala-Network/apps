import Property from '@/components/Property'
import useGetApr from '@/hooks/useGetApr'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSelectedVaultState from '@/hooks/useSelectedVaultState'
import useSignAndSend from '@/hooks/useSignAndSend'
import {aprToApy} from '@/lib/apr'
import {BasePoolCommonFragment} from '@/lib/subsquidQuery'
import {barlow} from '@/lib/theme'
import {LoadingButton} from '@mui/lab'
import {Skeleton, Stack, SxProps, TextField} from '@mui/material'
import {getDecimalPattern, toPercentage} from '@phala/util'
import Decimal from 'decimal.js'
import {FC, useMemo, useState} from 'react'

const DelegateInput: FC<{basePool: BasePoolCommonFragment; sx?: SxProps}> = ({
  basePool,
  sx,
}) => {
  const isVault = basePool.kind === 'Vault'
  const color = isVault ? 'secondary' : 'primary'
  const api = usePolkadotApi()
  const getApr = useGetApr()
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
    const amount = new Decimal(amountString).times(1e12).toHex()
    setLoading(true)
    const extrinsic = isVault
      ? api.tx.phalaVault.contribute(basePool.pid, amount)
      : api.tx.phalaStakePoolv2.contribute(
          basePool.pid,
          amount,
          asAccount ? null : selectedVaultState.id
        )

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
  const delegatedApr = useMemo(() => {
    const apr = getApr(basePool.aprMultiplier)
    if (!apr) return
    try {
      const totalValue = new Decimal(basePool.totalValue)
      const amount = new Decimal(amountString)

      return apr.times(totalValue).div(totalValue.plus(amount))
    } catch (err) {
      return '-'
    }
  }, [amountString, basePool.aprMultiplier, basePool.totalValue, getApr])
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
          fullWidth
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
      <Property
        size="small"
        label={`Est. delegated ${isVault ? 'APY' : 'APR'}`}
      >
        {typeof delegatedApr === 'string' ? (
          '-'
        ) : delegatedApr ? (
          toPercentage(isVault ? aprToApy(delegatedApr) : delegatedApr)
        ) : (
          <Skeleton width={32} />
        )}
      </Property>
    </Stack>
  )
}

export default DelegateInput
