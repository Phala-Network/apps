import vaultAbi from '@/assets/pha_vault_abi'
import Property from '@/components/Property'
import WrapDecimal from '@/components/WrapDecimal'
import {VAULT_CONTRACT_ADDRESS} from '@/config'
import {
  useMaxUnlockRequests,
  useUnlockPeriod,
  useUnlockRequests,
} from '@/hooks/staking'
import {
  Box,
  Button,
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
import {formatUnits} from 'viem'
import {
  useAccount,
  useBlock,
  useTransactionReceipt,
  useWriteContract,
} from 'wagmi'

const Unstake = () => {
  const [cancelIndex, setCancelIndex] = useState<number | null>(null)
  const {enqueueSnackbar} = useSnackbar()
  const {data: block} = useBlock({watch: true})
  const now = useMemo(() => {
    if (block == null) return
    return Number.parseInt(block.timestamp.toString()) * 1000
  }, [block])
  const {address} = useAccount()
  const unlockRequests = useUnlockRequests(address)
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
    <Box p={{xs: 2, md: 3}}>
      <Typography variant="h6" lineHeight={1.2}>
        Unstake Requests
      </Typography>

      <Box display="flex" gap={2} my={3}>
        <Box flex={1}>
          <Property label="Used requests" wrapDecimal>
            {`${unlockRequests?.length ?? '-'} / ${maxUnlockRequests ?? '-'}`}
          </Property>
        </Box>
        <Box flex={1}>
          <Property label="Total unstaking" wrapDecimal>
            {totalUnlocking == null
              ? '-'
              : toCurrency(formatUnits(totalUnlocking, 18))}
          </Property>
        </Box>
        <Box flex={1}>
          <Property label="Total claimable" wrapDecimal>
            {totalClaimable == null
              ? '-'
              : toCurrency(formatUnits(totalClaimable, 18))}
          </Property>
        </Box>
      </Box>
      <TableContainer
        component={Paper}
        sx={{background: 'transparent', mt: 2, minHeight: 256}}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Countdown</TableCell>
              <TableCell>Amount</TableCell>
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
                  <Tooltip
                    title={new Date(row.endTime).toLocaleString()}
                    placement="right"
                  >
                    <Box>
                      {row.countdown == null ? (
                        <Typography variant="body2" color="text.secondary">
                          Claimable
                        </Typography>
                      ) : (
                        row.countdown
                      )}
                    </Box>
                  </Tooltip>
                </TableCell>
                <TableCell component="th" scope="row" align="right">
                  <Typography variant="num6">
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
            height={200}
            color="text.secondary"
          >
            <Typography variant="body2">No unstake request</Typography>
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
        sx={{mt: 2}}
      >
        Claim all
      </Button>
    </Box>
  )
}

export default Unstake
