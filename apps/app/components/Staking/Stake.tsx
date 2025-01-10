import vaultAbi from '@/assets/pha_vault_abi'
import Property from '@/components/Property'
import SwitchChainButton from '@/components/SwitchChainButton'
import {PHA_CONTRACT_ADDRESS, VAULT_CONTRACT_ADDRESS} from '@/config'
import {
  useAllowance,
  useAssetsToShares,
  useBalance,
  useMaxUnlockRequests,
  useRewardRate,
  useShares,
  useSharesToAssets,
  useTotalAssets,
  useUnlockPeriod,
  useUnlockRequests,
} from '@/hooks/staking'
import {barlow} from '@/lib/theme'
import {OpenInNew, Unarchive} from '@mui/icons-material'
import {LoadingButton} from '@mui/lab'
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
  Typography,
} from '@mui/material'
import {getDecimalPattern, toCurrency, trimAddress} from '@phala/lib'
import phaIcon from '@phala/ui/icons/asset/pha.png'
import {formatDuration, intervalToDuration} from 'date-fns'
import Decimal from 'decimal.js'
import Image from 'next/image'
import {useSnackbar} from 'notistack'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {erc20Abi, formatUnits, parseUnits} from 'viem'
import {useAccount, useWaitForTransactionReceipt, useWriteContract} from 'wagmi'

const Stake = () => {
  const [tab, setTab] = useState(0)
  const isStake = tab === 0
  const isUnstake = tab === 1
  const {enqueueSnackbar} = useSnackbar()
  const {address, chain} = useAccount()
  const userShares = useShares(address)
  const userAssets = useSharesToAssets(userShares)
  const unlockRequests = useUnlockRequests(address)
  const maxUnlockRequests = useMaxUnlockRequests()
  const totalAssets = useTotalAssets()
  const rewardRate = useRewardRate()
  const [amountString, setAmountString] = useState('')
  const allowance = useAllowance(address)
  const balance = useBalance(address)
  const unlockPeriod = useUnlockPeriod()
  const {
    writeContract: executeApprove,
    data: approveTx,
    isPending: isApprovePending,
    reset: resetApprove,
    failureReason: approveFailureReason,
  } = useWriteContract()
  const {
    writeContract: executeDeposit,
    data: depositTx,
    isPending: isDepositPending,
    reset: resetDeposit,
    failureReason: depositFailureReason,
  } = useWriteContract({
    mutation: {
      onError: () => {
        enqueueSnackbar('Stake failed', {variant: 'error'})
      },
    },
  })
  const {
    writeContract: executeWithdraw,
    data: withdrawTx,
    isPending: isWithdrawPending,
    reset: resetWithdraw,
    failureReason: withdrawFailureReason,
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

  const maxAmount = useMemo(() => {
    let value = undefined
    if (isStake) {
      value = balance
    }
    if (isUnstake) {
      value = userAssets
    }
    return value
  }, [balance, userAssets, isStake, isUnstake])

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

  const shares = useAssetsToShares(amount)

  const percentage = useMemo(() => {
    if (maxAmount == null || amount == null || maxAmount === 0n) {
      return 0
    }
    return Decimal.min(
      new Decimal(amount.toString()).div(maxAmount.toString()).mul(100),
      100,
    )
      .toDP(0)
      .toNumber()
  }, [amount, maxAmount])

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
      enqueueSnackbar('Stake successful', {variant: 'success'})
      resetDeposit()
    } else if (status === 'reverted') {
      enqueueSnackbar('Stake failed', {variant: 'error'})
      resetDeposit()
    }
  }, [depositResult.data?.status, enqueueSnackbar, resetDeposit])

  useEffect(() => {
    const status = withdrawResult.data?.status
    if (status === 'success') {
      setAmountString('')
      enqueueSnackbar('Unstake successful', {variant: 'success'})
      resetWithdraw()
    } else if (status === 'reverted') {
      enqueueSnackbar('Unstake failed', {variant: 'error'})
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
        functionName: 'withdraw',
        args: [amount, address, address],
      })
    }
  }

  const buttonErrorMessage = useMemo(() => {
    if (isUnstake) {
      if (
        unlockRequests != null &&
        maxUnlockRequests != null &&
        unlockRequests.length >= maxUnlockRequests
      ) {
        return 'Exceed max unlock requests'
      }
      if (amount != null && userAssets != null && amount > userAssets) {
        return 'Insufficient staking'
      }
    }
    if (isStake) {
      if (amount != null && balance != null && amount > balance) {
        return 'Insufficient balance'
      }
    }
  }, [
    isUnstake,
    unlockRequests,
    maxUnlockRequests,
    amount,
    userAssets,
    isStake,
    balance,
  ])

  const dailyRewards = useMemo(() => {
    if (
      !isStake ||
      rewardRate == null ||
      totalAssets == null ||
      totalAssets === 0n ||
      amount == null
    ) {
      return null
    }
    return Decimal.mul(rewardRate.toString(), 24 * 60 * 60)
      .mul(amount.toString())
      .div((totalAssets + amount).toString())
      .toDP(0)
      .div(1e18)
      .toString()
  }, [isStake, rewardRate, totalAssets, amount])

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
        spacing={2}
        p={3}
      >
        {isStake && (
          <Stack
            direction="row"
            spacing={2}
            width={1}
            alignItems="center"
            justifyContent="space-between"
            height={68}
          >
            <Stack direction="row" alignItems="center" spacing={2} py={2}>
              <Image src={phaIcon} width={36} height={36} alt="PHA" />
              <Typography variant="h6">PHA</Typography>
              <Chip
                size="small"
                label={
                  <Box display="flex" alignItems="center" gap={0.5}>
                    {trimAddress(PHA_CONTRACT_ADDRESS)}
                    <OpenInNew sx={{width: 14, height: 14}} />
                  </Box>
                }
                onClick={() => {}}
                component="a"
                variant="outlined"
                href={`${chain?.blockExplorers?.default.url}/address/${PHA_CONTRACT_ADDRESS}`}
                target="_blank"
              />
            </Stack>
            <Property size="small" label="Balance" wrapDecimal>
              {balance != null ? toCurrency(formatUnits(balance, 18)) : '-'}
            </Property>
          </Stack>
        )}
        {isUnstake && (
          <Stack
            direction="row"
            spacing={2}
            width={1}
            alignItems="center"
            justifyContent="space-between"
            height={68}
          >
            <Stack direction="row" alignItems="center" spacing={2} py={2}>
              <Unarchive sx={{width: 36, height: 36}} />
              <Typography variant="h6">Unstake</Typography>
            </Stack>
            <Property size="small" label="My Staking" wrapDecimal>
              {userAssets != null
                ? toCurrency(formatUnits(userAssets, 18))
                : '-'}
            </Property>
          </Stack>
        )}
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
                if (maxAmount != null) {
                  setAmountString(formatUnits(maxAmount, 18))
                }
              }}
            >
              Max
            </Button>
          }
          sx={{
            fontFamily: barlow.style.fontFamily,
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
            disabled={isLoading || (isStake && balance == null)}
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
              if (maxAmount != null && !Array.isArray(value)) {
                setAmountString(
                  new Decimal(value)
                    .div(100)
                    .mul(maxAmount.toString())
                    .div(1e18)
                    .toDP(18)
                    .toString(),
                )
              }
            }}
          />
        </Box>

        <Paper sx={{p: 2, width: 1, height: 142}}>
          <Stack gap={1} width={1}>
            {isStake && (
              <Property
                size="small"
                fullWidth
                label="Estimated Daily Rewards"
                wrapDecimal
              >
                {dailyRewards != null ? toCurrency(dailyRewards) : '-'}
              </Property>
            )}
            {/* <Property size="small" fullWidth label="Shares" wrapDecimal>
              {shares != null ? toCurrency(formatUnits(shares, 18)) : '-'}
            </Property> */}
            <Property size="small" fullWidth label="Unstake Period">
              {unlockPeriod != null ? (
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
          <LoadingButton
            fullWidth
            sx={{mt: 2}}
            type="submit"
            disabled={
              (isStake &&
                (amount == null ||
                  balance == null ||
                  amount === 0n ||
                  amount > balance)) ||
              (isUnstake &&
                (amount == null ||
                  amount === 0n ||
                  userAssets == null ||
                  amount > userAssets)) ||
              buttonErrorMessage != null
            }
            loading={isLoading}
            variant="contained"
          >
            {buttonErrorMessage == null &&
              isStake &&
              (needApprove ? 'Approve and Stake' : 'Stake')}
            {buttonErrorMessage == null && isUnstake && 'Unstake'}
            {buttonErrorMessage != null && buttonErrorMessage}
          </LoadingButton>
        </SwitchChainButton>
      </Stack>
    </Box>
  )
}

export default Stake
