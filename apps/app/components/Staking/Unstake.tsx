import vaultAbi from '@/assets/pha_vault_abi'
import Property from '@/components/Property'
import {
  useMaxUnlockRequests,
  useUnlockRequests,
  vaultContract,
} from '@/hooks/staking'
import {LoadingButton} from '@mui/lab'
import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import {toCurrency} from '@phala/lib'
import {formatDuration, intervalToDuration, isAfter, isBefore} from 'date-fns'
import {useSnackbar} from 'notistack'
import {useEffect, useMemo, useState} from 'react'
import useSWR from 'swr'
import {formatUnits} from 'viem'
import {useAccount, useTransactionReceipt, useWriteContract} from 'wagmi'
import WrapDecimal from '../WrapDecimal'

const Unstake = () => {
  const [cancelIndex, setCancelIndex] = useState<number | null>(null)
  const {enqueueSnackbar} = useSnackbar()
  const {data: now} = useSWR('now', () => new Date().getTime(), {
    fallbackData: new Date().getTime(),
    refreshInterval: 60 * 1000,
    revalidateIfStale: true,
    refreshWhenHidden: true,
    refreshWhenOffline: true,
  })
  const {address} = useAccount()
  const unlockRequests = useUnlockRequests(address)
  const maxUnlockRequests = useMaxUnlockRequests()
  const {
    writeContract: executeClaim,
    data: claimTx,
    isPending: isClaimPending,
    reset: resetClaim,
  } = useWriteContract()
  const {
    writeContract: executeCancel,
    data: cancelTx,
    isPending: isCancelPending,
    reset: resetCancel,
  } = useWriteContract()
  const claimResult = useTransactionReceipt({hash: claimTx})
  const cancelResult = useTransactionReceipt({hash: cancelTx})

  const isClaimLoading = isClaimPending || claimResult.isLoading
  const isCancelLoading = isCancelPending || cancelResult.isLoading

  const claim = () => {
    if (address != null) {
      executeClaim({
        address: vaultContract,
        abi: vaultAbi,
        functionName: 'claim',
        args: [address],
      })
    }
  }

  const cancel = (index: number) => {
    if (address != null) {
      executeCancel({
        address: vaultContract,
        abi: vaultAbi,
        functionName: 'cancelUnlockRequest',
        args: [BigInt(index), address],
      })
    }
  }

  const rows = useMemo(() => {
    if (!unlockRequests) return null
    return unlockRequests.map((request, index) => {
      let countdown = null
      if (isAfter(request.unlockTime, now)) {
        countdown = formatDuration(
          intervalToDuration({
            start: now,
            end: request.unlockTime,
          }),
          {format: ['days', 'hours', 'minutes']},
        )
          .replace(/minute(s)?/g, 'm')
          .replace(/hour(s)?/g, 'h')
          .replace(/day(s)?/g, 'd')
        if (countdown === '') {
          countdown = '1 m'
        }
      }
      return {
        id: index,
        index,
        amount: request.assets,
        unlockTime: request.unlockTime,
        countdown,
      }
    })
  }, [unlockRequests, now])

  const totalUnlocking = useMemo(() => {
    if (!rows) return null
    return rows.reduce((acc, row) => {
      if (isAfter(row.unlockTime, now)) {
        return acc + row.amount
      }
      return acc
    }, 0n)
  }, [rows, now])

  const totalClaimable = useMemo(() => {
    if (!rows) return null
    return rows.reduce((acc, row) => {
      if (isBefore(row.unlockTime, now)) {
        return acc + row.amount
      }
      return acc
    }, 0n)
  }, [rows, now])

  useEffect(() => {
    if (claimResult.data?.status === 'success') {
      enqueueSnackbar('Claimed successfully', {variant: 'success'})
      resetClaim()
    }
  }, [claimResult.data?.status, enqueueSnackbar, resetClaim])

  useEffect(() => {
    if (cancelResult.data?.status === 'success') {
      enqueueSnackbar('Canceled successfully', {variant: 'success'})
      resetCancel()
    }
  }, [cancelResult.data?.status, enqueueSnackbar, resetCancel])

  useEffect(() => {
    if (unlockRequests?.length != null) {
      setCancelIndex(null)
    }
  }, [unlockRequests?.length])

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Unlock Requests</Typography>
        {maxUnlockRequests != null && unlockRequests != null && (
          <Chip
            variant="outlined"
            label={`${unlockRequests?.length} / ${maxUnlockRequests} request${unlockRequests.length > 1 ? 's' : ''}`}
          />
        )}
      </Box>
      <Box display="flex" gap={2} mt={2}>
        <Paper sx={{background: 'transparent', p: 2, flex: 1}}>
          <Property label="Total Unlocking" center wrapDecimal>
            {totalUnlocking == null
              ? '-'
              : toCurrency(formatUnits(totalUnlocking, 18))}
          </Property>
        </Paper>
        <Paper sx={{background: 'transparent', p: 2, flex: 1}}>
          <Property label="Total Claimable" center wrapDecimal>
            {totalClaimable == null
              ? '-'
              : toCurrency(formatUnits(totalClaimable, 18))}
          </Property>
        </Paper>
      </Box>
      <TableContainer
        component={Paper}
        sx={{background: 'transparent', mt: 2, minHeight: 256}}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Countdown</TableCell>
              <TableCell width={100} />
            </TableRow>
          </TableHead>

          <TableBody>
            {rows?.map((row) => (
              <TableRow
                key={row.index}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  <Typography variant="num6">
                    <WrapDecimal>
                      {toCurrency(formatUnits(row.amount, 18))}
                    </WrapDecimal>
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Tooltip
                    title={new Date(row.unlockTime).toLocaleString()}
                    placement="top-start"
                  >
                    <Box>
                      {row.countdown == null ? (
                        <Typography variant="body2" color="text.secondary">
                          Unlocked
                        </Typography>
                      ) : (
                        row.countdown
                      )}
                    </Box>
                  </Tooltip>
                </TableCell>
                <TableCell component="th" scope="row">
                  <LoadingButton
                    loading={isCancelLoading && cancelIndex === row.index}
                    variant="text"
                    size="small"
                    onClick={() => {
                      setCancelIndex(row.index)
                      cancel(row.index)
                    }}
                    disabled={isCancelLoading}
                  >
                    Cancel
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {rows?.length === 0 && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={200}
            color="text.secondary"
          >
            <Typography variant="body2">No unlock request</Typography>
          </Box>
        )}
      </TableContainer>

      <LoadingButton
        fullWidth
        loading={isClaimLoading}
        disabled={
          totalClaimable == null || totalClaimable === 0n || isCancelLoading
        }
        onClick={claim}
        sx={{mt: 2}}
      >
        Claim Unlocked
      </LoadingButton>
    </Box>
  )
}

export default Unstake
