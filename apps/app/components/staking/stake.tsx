'use client'

import {OpenInNew} from '@mui/icons-material'
import {
  Box,
  Button,
  Chip,
  OutlinedInput,
  Paper,
  Slider,
  Stack,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import {getDecimalPattern, toCurrency, trimAddress} from '@phala/lib'
import phaIcon from '@phala/ui/icons/asset/pha.png'
import vphaIcon from '@phala/ui/icons/asset/vpha.png'
import {formatDuration, intervalToDuration} from 'date-fns'
import Decimal from 'decimal.js'
import Image from 'next/image'
import {useSnackbar} from 'notistack'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {erc20Abi, formatUnits, parseUnits} from 'viem'
import {useWaitForTransactionReceipt, useWriteContract} from 'wagmi'

import vaultAbi from '@/assets/pha_vault_abi'
import Property from '@/components/property'
import SwitchChainButton from '@/components/switch-chain-button'
import {
  explorerUrl,
  PHA_CONTRACT_ADDRESS,
  VAULT_CONTRACT_ADDRESS,
} from '@/config'
import {
  useAllowance,
  useAssetsToShares,
  useBalance,
  useMaxUnlockRequests,
  useSharesToAssets,
  useUnlockPeriod,
  useUnlockRequests,
} from '@/hooks/staking'
import {useValidConnection} from '@/hooks/use-valid-connection'

const oneUnit = parseUnits('1', 18)

const Stake = () => {
  const [tab, setTab] = useState(0)
  const isStake = tab === 0
  const isUnstake = tab === 1
  const [useDex, setUseDex] = useState(false)
  const tokenContractAddress = useMemo(() => {
    if (isStake) {
      return PHA_CONTRACT_ADDRESS
    }
    return VAULT_CONTRACT_ADDRESS
  }, [isStake])
  const {enqueueSnackbar} = useSnackbar()
  const {address, isValidConnection} = useValidConnection()

  const shareRate = useSharesToAssets(oneUnit)
  const assetRate = useAssetsToShares(oneUnit)
  const unlockRequests = useUnlockRequests(address, isValidConnection)
  const maxUnlockRequests = useMaxUnlockRequests()
  const [amountString, setAmountString] = useState('')
  const allowance = useAllowance(address, isValidConnection)
  const balance = useBalance(tokenContractAddress, address, isValidConnection)
  const unlockPeriod = useUnlockPeriod()
  const {
    writeContract: executeApprove,
    data: approveTx,
    isPending: isApprovePending,
    reset: resetApprove,
  } = useWriteContract()
  const {
    writeContract: executeDeposit,
    data: depositTx,
    isPending: isDepositPending,
    reset: resetDeposit,
  } = useWriteContract({
    mutation: {
      onError: () => {
        enqueueSnackbar('Staking failed', {variant: 'error'})
      },
    },
  })
  const {
    writeContract: executeWithdraw,
    data: withdrawTx,
    isPending: isWithdrawPending,
    reset: resetWithdraw,
  } = useWriteContract()
  const approveResult = useWaitForTransactionReceipt({hash: approveTx})
  const depositResult = useWaitForTransactionReceipt({hash: depositTx})
  const withdrawResult = useWaitForTransactionReceipt({hash: withdrawTx})

  const isLoading =
    (isStake &&
      (isApprovePending ||
        isDepositPending ||
        approveResult.isLoading ||
        depositResult.isLoading)) ||
    (isUnstake && (isWithdrawPending || withdrawResult.isLoading))

  const amount = useMemo(() => {
    if (amountString === '') {
      return null
    }
    try {
      return parseUnits(amountString, 18)
    } catch (err) {
      return null
    }
  }, [amountString])

  const needApprove = useMemo(() => {
    if (allowance == null || amount == null) {
      return false
    }
    return allowance < amount
  }, [allowance, amount])

  const shares = useAssetsToShares(isStake ? amount : null)
  const assets = useSharesToAssets(isUnstake ? amount : null)

  const percentage = useMemo(() => {
    if (amount == null || balance == null || balance === 0n) {
      return 0
    }
    return Decimal.min(
      new Decimal(amount.toString()).div(balance.toString()).mul(100),
      100,
    )
      .toDP(0)
      .toNumber()
  }, [amount, balance])

  const approve = async () => {
    if (amount != null) {
      executeApprove({
        address: PHA_CONTRACT_ADDRESS,
        abi: erc20Abi,
        functionName: 'approve',
        args: [VAULT_CONTRACT_ADDRESS, amount],
      })
    }
  }

  const deposit = useCallback(async () => {
    if (amount != null && address != null) {
      executeDeposit({
        address: VAULT_CONTRACT_ADDRESS,
        abi: vaultAbi,
        functionName: 'deposit',
        args: [amount, address],
      })
    }
  }, [amount, address, executeDeposit])

  useEffect(() => {
    if (approveResult.data?.status === 'success') {
      resetApprove()
      deposit()
    }
  }, [approveResult.data?.status, deposit, resetApprove])

  useEffect(() => {
    const status = depositResult.data?.status
    if (status === 'success') {
      setAmountString('')
      enqueueSnackbar('Successfully staked', {variant: 'success'})
      resetDeposit()
    } else if (status === 'reverted') {
      enqueueSnackbar('Staking failed', {variant: 'error'})
      resetDeposit()
    }
  }, [depositResult.data?.status, enqueueSnackbar, resetDeposit])

  useEffect(() => {
    const status = withdrawResult.data?.status
    if (status === 'success') {
      setAmountString('')
      enqueueSnackbar('Withdrawal request submitted', {variant: 'success'})
      resetWithdraw()
    } else if (status === 'reverted') {
      enqueueSnackbar('Withdrawal request failed', {variant: 'error'})
      resetWithdraw()
    }
  }, [withdrawResult.data?.status, enqueueSnackbar, resetWithdraw])

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isStake) {
      if (allowance != null && amount != null) {
        if (allowance < amount) {
          approve()
        } else {
          deposit()
        }
      }
    }

    if (isUnstake) {
      unstake()
    }
  }

  const unstake = async () => {
    if (amount != null && address != null) {
      executeWithdraw({
        address: VAULT_CONTRACT_ADDRESS,
        abi: vaultAbi,
        functionName: 'redeem',
        args: [amount, address, address],
      })
    }
  }

  const buttonErrorMessage = useMemo(() => {
    if (
      isUnstake &&
      unlockRequests != null &&
      maxUnlockRequests != null &&
      unlockRequests.length >= maxUnlockRequests
    ) {
      return 'Max withdrawal requests reached'
    }

    if (amount != null && balance != null && amount > balance) {
      return 'Insufficient Balance'
    }
  }, [isUnstake, unlockRequests, maxUnlockRequests, amount, balance])

  return (
    <Box>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs
          value={tab}
          onChange={(_, value) => {
            setTab(value)
            setAmountString('')
          }}
          sx={{width: 1}}
        >
          <Tab label="Stake" sx={{flex: 1}} />
          <Tab label="Unstake" sx={{flex: 1}} />
        </Tabs>
      </Box>
      <Stack
        component="form"
        alignItems="center"
        onSubmit={submit}
        gap={2.5}
        p={3}
      >
        <Stack
          direction={{xs: 'column', sm: 'row'}}
          spacing={{xs: 1, sm: 2}}
          width={1}
          alignItems={{xs: 'stretch', sm: 'center'}}
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={1.5} py={1}>
            <Image
              src={isStake ? phaIcon : vphaIcon}
              width={32}
              height={32}
              alt="PHA"
            />
            <Typography variant="h6">{isStake ? 'PHA' : 'vPHA'}</Typography>
            <Chip
              size="small"
              label={
                <Box display="flex" alignItems="center" gap={0.5}>
                  {trimAddress(tokenContractAddress)}
                  <OpenInNew sx={{width: 12, height: 12}} />
                </Box>
              }
              onClick={() => {}}
              component="a"
              variant="outlined"
              href={`${explorerUrl}/address/${tokenContractAddress}`}
              target="_blank"
              sx={{display: {xs: 'none', sm: 'inline-flex'}}}
            />
          </Stack>
          <Property size="small" label="Balance" wrapDecimal>
            {balance != null ? toCurrency(formatUnits(balance, 18)) : '-'}
          </Property>
        </Stack>

        <OutlinedInput
          placeholder="0.00"
          disabled={isLoading}
          value={amountString}
          endAdornment={
            <Button
              disabled={isLoading}
              size="small"
              variant="text"
              onClick={() => {
                if (balance != null) {
                  setAmountString(formatUnits(balance, 18))
                }
              }}
            >
              Max
            </Button>
          }
          sx={{
            fontWeight: 500,
            fontSize: '1.5rem',
          }}
          slotProps={{
            input: {
              inputMode: 'decimal',
              pattern: getDecimalPattern(18),
            },
          }}
          fullWidth
          size="small"
          onChange={(e) => {
            if (!e.target.validity.patternMismatch) {
              setAmountString(e.target.value)
            }
          }}
        />

        <Box px={1} width={1}>
          <Slider
            disabled={isLoading || balance == null}
            size="small"
            value={percentage}
            step={1}
            marks={[
              {value: 0},
              {value: 25},
              {value: 50},
              {value: 75},
              {value: 100},
            ]}
            sx={{color: 'text.secondary'}}
            min={0}
            max={100}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
            onChange={(_, value) => {
              if (balance != null && !Array.isArray(value)) {
                setAmountString(
                  new Decimal(value)
                    .div(100)
                    .mul(balance.toString())
                    .div(1e18)
                    .toDP(18)
                    .toString(),
                )
              }
            }}
          />
        </Box>

        {isUnstake && (
          <ToggleButtonGroup
            fullWidth
            size="small"
            color="primary"
            value={useDex ? 'dex' : 'unstake'}
            exclusive
            onChange={(_, value) => {
              setUseDex(value === 'dex')
            }}
            sx={{marginTop: -1}}
          >
            <ToggleButton value="unstake">Unstake</ToggleButton>
            <ToggleButton value="dex">Swap on DEX</ToggleButton>
          </ToggleButtonGroup>
        )}

        <Paper
          sx={(theme) => ({
            p: {xs: 1.5, sm: 2},
            width: 1,
            background: theme.palette.action.hover,
            border: 'none',
          })}
        >
          <Stack gap={1} width={1}>
            {isStake && (
              <Property size="small" fullWidth label="Estimated Output">
                {shares != null
                  ? `${toCurrency(formatUnits(shares, 18))} vPHA`
                  : '-'}
              </Property>
            )}
            {isUnstake && (
              <Property size="small" fullWidth label="Estimated Output">
                {useDex
                  ? 'View on DEX'
                  : assets != null
                    ? `${toCurrency(formatUnits(assets, 18))} PHA`
                    : '-'}
              </Property>
            )}

            {isStake && (
              <Property size="small" fullWidth label="Exchange Rate">
                {assetRate != null
                  ? `1 PHA = ${toCurrency(formatUnits(assetRate, 18), 4)} vPHA`
                  : '-'}
              </Property>
            )}

            {isUnstake && (
              <Property size="small" fullWidth label="Exchange Rate">
                {useDex
                  ? 'View on DEX'
                  : shareRate != null
                    ? `1 vPHA = ${toCurrency(formatUnits(shareRate, 18), 4)} PHA`
                    : '-'}
              </Property>
            )}

            <Property size="small" fullWidth label="Cooldown Period">
              {isUnstake && useDex ? (
                'Instant'
              ) : unlockPeriod != null ? (
                <Box component="span" sx={{textDecoration: 'underline dotted'}}>
                  {formatDuration(
                    intervalToDuration({start: 0, end: unlockPeriod}),
                  )}
                </Box>
              ) : (
                '-'
              )}
            </Property>
          </Stack>
        </Paper>

        <SwitchChainButton>
          <Button
            size="large"
            fullWidth
            disabled={
              amount == null ||
              balance == null ||
              amount === 0n ||
              amount > balance ||
              buttonErrorMessage != null
            }
            loading={isLoading}
            variant="contained"
            {...(isUnstake && useDex
              ? {
                  href: `https://app.uniswap.org/swap?chain=mainnet&inputCurrency=${VAULT_CONTRACT_ADDRESS}&outputCurrency=${PHA_CONTRACT_ADDRESS}&value=${amountString}&field=input`,
                  target: '_blank',
                }
              : {
                  type: 'submit',
                })}
          >
            {buttonErrorMessage == null &&
              isStake &&
              (needApprove ? 'Approve & Stake' : 'Stake')}
            {buttonErrorMessage == null &&
              isUnstake &&
              (useDex ? (
                <>
                  Swap on DEX
                  <OpenInNew sx={{width: 16, ml: 1}} />
                </>
              ) : (
                'Request Withdrawal'
              ))}
            {buttonErrorMessage != null && buttonErrorMessage}
          </Button>
        </SwitchChainButton>
      </Stack>
    </Box>
  )
}

export default Stake
