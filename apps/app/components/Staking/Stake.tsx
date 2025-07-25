import vaultAbi from '@/assets/pha_vault_abi'
import Property from '@/components/Property'
import SwitchChainButton from '@/components/SwitchChainButton'
import {
  PHA_CONTRACT_ADDRESS,
  VAULT_CONTRACT_ADDRESS,
  explorerUrl,
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
import {barlow} from '@/lib/theme'
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
import {useAccount, useWaitForTransactionReceipt, useWriteContract} from 'wagmi'

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
  const shareRate = useSharesToAssets(oneUnit)
  const assetRate = useAssetsToShares(oneUnit)
  const {address} = useAccount()
  const unlockRequests = useUnlockRequests(address)
  const maxUnlockRequests = useMaxUnlockRequests()
  const [amountString, setAmountString] = useState('')
  const allowance = useAllowance(address)
  const balance = useBalance(tokenContractAddress, address)
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
        enqueueSnackbar('Stake failed', {variant: 'error'})
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
      return 'Exceed max unlock requests'
    }

    if (amount != null && balance != null && amount > balance) {
      return 'Insufficient balance'
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
        gap={2}
        p={{xs: 2, md: 3}}
      >
        <Stack
          direction="row"
          spacing={2}
          width={1}
          alignItems="center"
          justifyContent="space-between"
          height={isStake ? 79 : 32}
        >
          <Stack direction="row" alignItems="center" spacing={2} py={2}>
            <Image
              src={isStake ? phaIcon : vphaIcon}
              width={36}
              height={36}
              alt="PHA"
            />
            <Typography variant="h6">{isStake ? 'PHA' : 'vPHA'}</Typography>
            <Chip
              size="small"
              label={
                <Box display="flex" alignItems="center" gap={0.5}>
                  {trimAddress(tokenContractAddress)}
                  <OpenInNew sx={{width: 14, height: 14}} />
                </Box>
              }
              onClick={() => {}}
              component="a"
              variant="outlined"
              href={`${explorerUrl}/address/${tokenContractAddress}`}
              target="_blank"
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
            p: 2,
            width: 1,
            background: theme.palette.action.hover,
            border: 'none',
            height: 106,
          })}
        >
          <Stack gap={1} width={1}>
            {isStake && (
              <Property size="small" fullWidth label="You will receive">
                {shares != null
                  ? `${toCurrency(formatUnits(shares, 18))} vPHA`
                  : '-'}
              </Property>
            )}
            {isUnstake && (
              <Property size="small" fullWidth label="You will receive">
                {useDex
                  ? 'View on DEX'
                  : assets != null
                    ? `${toCurrency(formatUnits(assets, 18))} PHA`
                    : '-'}
              </Property>
            )}

            {isStake && (
              <Property size="small" fullWidth label="Exchange rate">
                {assetRate != null
                  ? `1 PHA = ${toCurrency(formatUnits(assetRate, 18), 4)} vPHA`
                  : '-'}
              </Property>
            )}

            {isUnstake && (
              <Property size="small" fullWidth label="Exchange rate">
                {useDex
                  ? 'View on DEX'
                  : shareRate != null
                    ? `1 vPHA = ${toCurrency(formatUnits(shareRate, 18), 4)} PHA`
                    : '-'}
              </Property>
            )}

            <Property size="small" fullWidth label="Unstake period">
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
              (needApprove ? 'Approve and stake' : 'Stake')}
            {buttonErrorMessage == null &&
              isUnstake &&
              (useDex ? (
                <>
                  Swap on DEX
                  <OpenInNew sx={{width: 16, ml: 1}} />
                </>
              ) : (
                'Request unstake'
              ))}
            {buttonErrorMessage != null && buttonErrorMessage}
          </Button>
        </SwitchChainButton>
      </Stack>
    </Box>
  )
}

export default Stake
