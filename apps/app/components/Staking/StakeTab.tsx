import vaultAbi from '@/assets/pha_vault_abi'
import Property from '@/components/Property'
import {
  phaContract,
  useAllowance,
  useBalance,
  vaultContract,
} from '@/hooks/staking'
import {barlow} from '@/lib/theme'
import {LoadingButton} from '@mui/lab'
import {Button, OutlinedInput, Stack, Typography} from '@mui/material'
import {getDecimalPattern, toCurrency} from '@phala/lib'
import phaIcon from '@phala/ui/icons/asset/pha.png'
import Image from 'next/image'
import {useSnackbar} from 'notistack'
import {useState} from 'react'
import {type Hex, erc20Abi, formatUnits, parseUnits} from 'viem'
import {useAccount, useWriteContract} from 'wagmi'

const StakeTab = () => {
  const {enqueueSnackbar} = useSnackbar()
  const account = useAccount()
  const [amountString, setAmountString] = useState('')
  const allowance = useAllowance(account.address)
  const balance = useBalance(account.address)

  const {writeContractAsync: executeApprove} = useWriteContract({
    mutation: {
      onError(error) {
        enqueueSnackbar(error.message, {variant: 'error'})
      },
    },
  })
  const {writeContract: executeDeposit, isPending} = useWriteContract({
    mutation: {
      onError(error) {
        enqueueSnackbar(error.message, {variant: 'error'})
      },
    },
  })

  const stake = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!allowance) {
      return
    }
    const amount = parseUnits(amountString, 18)
    if (allowance < amount) {
      await executeApprove({
        address: phaContract,
        abi: erc20Abi,
        functionName: 'approve',
        args: [vaultContract, amount],
      }).catch((err) => {
        if (err instanceof Error) {
          enqueueSnackbar(err.message, {variant: 'error'})
        }
      })
    }
    executeDeposit({
      address: vaultContract,
      abi: vaultAbi,
      functionName: 'deposit',
      args: [amount, account.address as Hex],
    })
  }
  return (
    <Stack component="form" alignItems="center" onSubmit={stake} spacing={2}>
      <Stack
        direction="row"
        spacing={2}
        width={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center" spacing={2} py={2}>
          <Image src={phaIcon} width={36} height={36} alt="PHA" />
          <Typography variant="h6">PHA</Typography>
        </Stack>
        <Property size="small" label="Balance" wrapDecimal>
          {balance != null ? toCurrency(formatUnits(balance, 18)) : '-'}
        </Property>
      </Stack>
      <OutlinedInput
        placeholder="0.00"
        disabled={isPending}
        value={amountString}
        endAdornment={
          <Button size="small" variant="text">
            Max
          </Button>
        }
        sx={{
          fontFamily: barlow.style.fontFamily,
          fontWeight: 600,
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

      <LoadingButton
        fullWidth
        sx={{mt: 2}}
        type="submit"
        // disabled={disabled}
        // loading={isPending}
        variant="contained"
      >
        Stake
      </LoadingButton>
    </Stack>
  )
}

export default StakeTab
