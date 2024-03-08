import Property from '@/components/Property'
import {WPHA_ASSET_ID} from '@/config'
import useAssetBalance from '@/hooks/useAssetBalance'
import useGetApr from '@/hooks/useGetApr'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSelectedVaultState from '@/hooks/useSelectedVaultState'
import useSignAndSend from '@/hooks/useSignAndSend'
import {aprToApy} from '@/lib/apr'
import type {BasePoolCommonFragment} from '@/lib/subsquidQuery'
import {barlow} from '@/lib/theme'
import {LoadingButton} from '@mui/lab'
import {Skeleton, Stack, type SxProps, TextField} from '@mui/material'
import {getDecimalPattern, toCurrency, toPercentage} from '@phala/lib'
import {polkadotAccountAtom} from '@phala/store'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {type FC, useMemo, useState} from 'react'

const DelegateInput: FC<{basePool: BasePoolCommonFragment; sx?: SxProps}> = ({
  basePool,
  sx,
}) => {
  const isVault = basePool.kind === 'Vault'
  const color = isVault ? 'secondary' : 'primary'
  const api = usePolkadotApi()
  const getApr = useGetApr()
  const [loading, setLoading] = useState(false)
  const [account] = useAtom(polkadotAccountAtom)
  const selectedVaultState = useSelectedVaultState()
  const signAndSend = useSignAndSend()
  const [amountString, setAmountString] = useState('')
  const asAccount = selectedVaultState === null
  const disabled = useMemo(() => {
    return amountString === '' || selectedVaultState === undefined
  }, [amountString, selectedVaultState])
  const delegatorAddress = asAccount
    ? account?.address
    : selectedVaultState?.account.id
  const wrappedBalance = useAssetBalance(delegatorAddress, WPHA_ASSET_ID)
  const availableBalance = useAssetBalance(
    asAccount ? account?.address : undefined,
    'available',
  )
  const delegableBalance = useMemo(() => {
    if (wrappedBalance != null) {
      if (asAccount) {
        return availableBalance?.plus(wrappedBalance)
      }
      return wrappedBalance
    }
  }, [availableBalance, wrappedBalance, asAccount])
  const delegate = (): void => {
    if (
      api == null ||
      selectedVaultState === undefined ||
      wrappedBalance == null
    ) {
      return
    }
    const amount = new Decimal(amountString).times(1e12)
    const wrapAmount = amount.minus(wrappedBalance.times(1e12))
    setLoading(true)
    const extrinsic = isVault
      ? api.tx.phalaVault.contribute(basePool.pid, amount.toHex())
      : api.tx.phalaStakePoolv2.contribute(
          basePool.pid,
          amount.toHex(),
          asAccount ? null : selectedVaultState.id,
        )

    void signAndSend(
      asAccount && wrapAmount.gt(0)
        ? api.tx.utility.batchAll([
            api.tx.phalaWrappedBalances.wrap(wrapAmount.toHex()),
            extrinsic,
          ])
        : extrinsic,
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
    if (apr == null) return
    try {
      const totalValue = new Decimal(basePool.totalValue)
      const amount = Decimal.max(
        0,
        new Decimal(amountString).minus(basePool.withdrawingValue),
      )

      return apr.times(totalValue).div(totalValue.plus(amount))
    } catch (err) {
      return '-'
    }
  }, [
    amountString,
    basePool.aprMultiplier,
    basePool.totalValue,
    getApr,
    basePool.withdrawingValue,
  ])
  return (
    <Stack sx={sx}>
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
        label="Delegable balance"
        sx={{mt: 1}}
        wikiEntry="delegableBalance"
      >
        {delegableBalance != null ? (
          `${toCurrency(delegableBalance)} PHA`
        ) : (
          <Skeleton width={32} />
        )}
      </Property>
      <Property
        size="small"
        label={`Est. delegated ${isVault ? 'APY' : 'APR'}`}
        sx={{mt: 0.5}}
        wikiEntry="estDelegatedApr"
      >
        {typeof delegatedApr === 'string' ? (
          '-'
        ) : delegatedApr != null ? (
          toPercentage(isVault ? aprToApy(delegatedApr) : delegatedApr)
        ) : (
          <Skeleton width={32} />
        )}
      </Property>
    </Stack>
  )
}

export default DelegateInput
