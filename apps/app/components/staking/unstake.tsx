'use client'

import {
  Box,
  Button,
  Paper,
  Stack,
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
import {formatUnits} from 'viem'
import {useBlock, useTransactionReceipt, useWriteContract} from 'wagmi'

import vaultAbi from '@/assets/pha_vault_abi'
import Property from '@/components/property'
import WrapDecimal from '@/components/wrap-decimal'
import {VAULT_CONTRACT_ADDRESS} from '@/config'
import {
  useMaxUnlockRequests,
  useUnlockPeriod,
  useUnlockRequests,
} from '@/hooks/staking'
import {useValidConnection} from '@/hooks/use-valid-connection'

const Unstake = () => {
  const [cancelIndex, setCancelIndex] = useState<number | null>(null)
  const {enqueueSnackbar} = useSnackbar()
  const {data: block} = useBlock({watch: true})
  const now = useMemo(() => {
    if (block == null) return
    return Number.parseInt(block.timestamp.toString()) * 1000
  }, [block])
  const {address, isValidConnection} = useValidConnection()

  const unlockRequests = useUnlockRequests(address, isValidConnection)
  const maxUnlockRequests = useMaxUnlockRequests()
  const unlockPeriod = useUnlockPeriod()
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
        address: VAULT_CONTRACT_ADDRESS,
        abi: vaultAbi,
        functionName: 'claim',
        args: [address],
      })
    }
  }

  const cancel = (index: number) => {
    if (address != null) {
      executeCancel({
        address: VAULT_CONTRACT_ADDRESS,
        abi: vaultAbi,
        functionName: 'cancelUnlockRequest',
        args: [BigInt(index), address],
      })
    }
  }

  const rows = useMemo(() => {
    if (!unlockRequests || unlockPeriod == null || now == null) return null
    return unlockRequests.map((request, index) => {
      let countdown = null
      const endTime = request.startTime + unlockPeriod
      if (isAfter(endTime, now)) {
        countdown = formatDuration(
          intervalToDuration({
            start: now,
            end: endTime,
          }),
          {format: ['days', 'hours', 'minutes']},
        )
          .replace(/ minute(s)?/g, 'm')
          .replace(/ hour(s)?/g, 'h')
          .replace(/ day(s)?/g, 'd')
        if (countdown === '') {
          countdown = '1m'
        }
      }
      return {
        id: index,
        index,
        amount: request.assets,
        startTime: request.startTime,
        endTime,
        countdown,
      }
    })
  }, [unlockRequests, now, unlockPeriod])

  const totalUnlocking = useMemo(() => {
    if (!rows || now == null) return null
    return rows.reduce((acc, row) => {
      if (isAfter(row.endTime, now)) {
        return acc + row.amount
      }
      return acc
    }, 0n)
  }, [rows, now])

  const totalClaimable = useMemo(() => {
    if (!rows || now == null) return null
    return rows.reduce((acc, row) => {
      if (isBefore(row.endTime, now)) {
        return acc + row.amount
      }
      return acc
    }, 0n)
  }, [rows, now])

  useEffect(() => {
    if (claimResult.data?.status === 'success') {
      enqueueSnackbar('Successfully claimed', {variant: 'success'})
      resetClaim()
    }
  }, [claimResult.data?.status, enqueueSnackbar, resetClaim])

  useEffect(() => {
    if (cancelResult.data?.status === 'success') {
      enqueueSnackbar('Request cancelled', {variant: 'success'})
      resetCancel()
    }
  }, [cancelResult.data?.status, enqueueSnackbar, resetCancel])

  useEffect(() => {
    if (unlockRequests?.length != null) {
      setCancelIndex(null)
    }
  }, [unlockRequests?.length])

  return (
    <Stack p={3} height="100%">
      <Typography variant="h6" lineHeight={1.2} mb={2}>
        Withdrawal Requests
      </Typography>

      <Stack direction="row" spacing={4} mb={3} py={1}>
        <Property label="Active Requests" wrapDecimal>
          {`${unlockRequests?.length ?? '-'} / ${maxUnlockRequests ?? '-'}`}
        </Property>
        <Property label="Pending" wrapDecimal>
          {totalUnlocking == null
            ? '-'
            : toCurrency(formatUnits(totalUnlocking, 18))}
        </Property>
        <Property label="Claimable" wrapDecimal>
          {totalClaimable == null
            ? '-'
            : toCurrency(formatUnits(totalClaimable, 18))}
        </Property>
      </Stack>
      <TableContainer
        component={Paper}
        sx={{background: 'transparent', flex: 1, minHeight: 0}}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Time Remaining</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell width={80} />
            </TableRow>
          </TableHead>

          <TableBody>
            {rows?.map((row) => (
              <TableRow
                key={row.index}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  <Tooltip
                    title={new Date(row.endTime).toLocaleString()}
                    placement="right"
                  >
                    <Box>
                      {row.countdown == null ? (
                        <Typography variant="body2" color="success.main">
                          Ready
                        </Typography>
                      ) : (
                        row.countdown
                      )}
                    </Box>
                  </Tooltip>
                </TableCell>
                <TableCell component="th" scope="row" align="right">
                  <Typography sx={{fontWeight: 500, fontSize: '0.9rem'}}>
                    <WrapDecimal>
                      {toCurrency(formatUnits(row.amount, 18))}
                    </WrapDecimal>
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button
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
                  </Button>
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
            height={160}
            color="text.secondary"
          >
            <Typography variant="body2">No pending withdrawals</Typography>
          </Box>
        )}
      </TableContainer>

      <Button
        size="large"
        fullWidth
        loading={isClaimLoading}
        disabled={
          totalClaimable == null || totalClaimable === 0n || isCancelLoading
        }
        onClick={claim}
        sx={{mt: 3}}
      >
        Claim All
      </Button>
    </Stack>
  )
}

export default Unstake
