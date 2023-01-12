import Empty from '@/components/Empty'
import PageHeader from '@/components/PageHeader'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import {walletDialogOpenAtom} from '@/store/ui'
import {LoadingButton} from '@mui/lab'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {toCurrency, validateAddress} from '@phala/util'
import {useQuery} from '@tanstack/react-query'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {NextPage} from 'next'
import {useEffect, useMemo, useState} from 'react'

type Row = {pid: string; amount: Decimal; claimed: boolean}

const ClaimMissingDelegatorRewards: NextPage = () => {
  const signAndSend = useSignAndSend()
  const [pid, setPid] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [targetAddress, setTargetAddress] = useState('')
  const onClose = () => {
    setDialogOpen(false)
  }
  const [account] = useAtom(polkadotAccountAtom)
  const [, setWalletDialogOpen] = useAtom(walletDialogOpenAtom)
  const [list, setList] = useState<Row[]>()
  const api = usePolkadotApi()
  const {data} = useQuery(
    ['legacyRewards', account?.address, list],
    async () => {
      if (account?.address && api && list?.length) {
        const result = list
        const legacyRewards =
          await api.query.phalaStakePoolv2.legacyRewards.multi(
            list.map((x) => [account.address, x.pid])
          )
        for (let i = 0; i < legacyRewards.length; i++) {
          if (legacyRewards[i].isNone) {
            result[i].claimed = true
          }
        }
        return result
      }
      return []
    },
    {
      enabled: !!list && !!account?.address && !!api,
      refetchInterval: 12000,
    }
  )

  useEffect(() => {
    let unmounted = false
    import('@/assets/legacyRewards.json').then((res) => {
      const legacyRewardsMap = res.default.legacyRewards
      if (
        !unmounted &&
        account?.address &&
        account.address in legacyRewardsMap
      ) {
        setList(
          res.default.legacyRewards[
            account.address as keyof typeof legacyRewardsMap
          ].map(([pid, amount]) => ({
            pid,
            amount: new Decimal(amount).div(1e12),
            claimed: false,
          }))
        )
      } else {
        setList([])
      }
    })
    return () => {
      unmounted = true
    }
  }, [account?.address])

  const totalRewards = useMemo(() => {
    return data
      ?.filter((x) => !x.claimed)
      .reduce((acc, cur) => acc.add(cur.amount), new Decimal(0))
  }, [data])

  const addressValid = useMemo(
    () => validateAddress(targetAddress),
    [targetAddress]
  )

  const claim = async () => {
    if (!api || !data) return
    const getExtrinsic = (pid: string) =>
      api.tx.phalaStakePoolv2.claimLegacyRewards(pid, targetAddress)
    const calls = []
    if (pid) {
      calls.push(getExtrinsic(pid))
    } else {
      calls.push(
        ...data.filter((x) => !x.claimed).map(({pid}) => getExtrinsic(pid))
      )
    }
    setLoading(true)
    signAndSend(calls.length === 1 ? calls[0] : api.tx.utility.batchAll(calls))
      .then(() => {
        onClose()
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <PageHeader title="Claim Missing Delegator Rewards" />
      <Paper
        variant="outlined"
        sx={{p: 3, background: 'transparent', 'p + p': {mt: '1em'}}}
      >
        <Typography variant="body1">Hey Phamily,</Typography>
        <Typography variant="body1">
          As highlighted in a recent forum post, a StakePool v2 delegation{' '}
          <Link
            target="_blank"
            href="https://forum.phala.network/t/bug-report-v2-delegation-claimable-rewards-error-30-12-2022/3817"
          >
            bug
          </Link>{' '}
          was discovered on 30/12/22.
        </Typography>
        <Typography variant="body1">
          We have added a page in Phala App for users to claim their missing
          delegation rewards. All affected addresses are listed{' '}
          <Link
            target="_blank"
            href="https://docs.google.com/spreadsheets/d/1jI0LGTpZ8VlSX0EwYzNkJIYz40bJV7aH4ktSN1O-Gro/edit?usp=sharing"
          >
            here
          </Link>
          .
        </Typography>
        <Typography variant="body1">
          Please contact us if you have any questions. We deeply value our
          community so we want to be as helpful as possible. We apologize for
          any inconvenience caused by this bug. Thank you for your patience,
          understanding and support Pham!
        </Typography>
        <Typography variant="body1">
          Best,
          <br />
          Phala team
        </Typography>
      </Paper>

      {!!account && (
        <Stack spacing={2} direction="row" alignItems="center" mt={4}>
          <Typography variant="h6" component="h2" color="text.secondary">
            Total Rewards
          </Typography>
          <Typography variant="num3">
            {totalRewards ? (
              `${toCurrency(totalRewards)} PHA`
            ) : (
              <Skeleton width={100} />
            )}
          </Typography>
          <Button
            size="small"
            disabled={!totalRewards || totalRewards.eq(0)}
            onClick={() => {
              setTargetAddress('')
              setDialogOpen(true)
              setPid(undefined)
            }}
          >
            Claim All
          </Button>
        </Stack>
      )}

      {data && data.length === 0 && <Empty sx={{mt: 6}} />}

      {!!account && !data && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="200px"
        >
          <CircularProgress />
        </Box>
      )}

      {!account && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="200px"
        >
          <Button
            onClick={() => {
              setWalletDialogOpen(true)
            }}
          >
            Connect Wallet
          </Button>
        </Box>
      )}

      {data && data.length > 0 && (
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{mt: 3, background: 'transparent'}}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={200}>StakePool</TableCell>
                <TableCell>Rewards</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.pid}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell component="th" scope="row">
                    <Typography variant="body1">{`#${row.pid}`}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="num6">
                      {`${toCurrency(row.amount)} PHA`}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="text"
                      size="small"
                      disabled={row.claimed}
                      onClick={() => {
                        setTargetAddress('')
                        setPid(row.pid)
                        setDialogOpen(true)
                      }}
                    >
                      {row.claimed ? 'Claimed' : 'Claim'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={dialogOpen} onClose={onClose}>
        <DialogTitle>Claim Missing Delegator Reward</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Target Address"
            multiline
            rows={2}
            fullWidth
            inputProps={{pattern: '^[0-9a-zA-Z]*$'}}
            InputProps={{
              endAdornment: !targetAddress && (
                <Button
                  size="small"
                  variant="text"
                  sx={{flexShrink: 0}}
                  onClick={() => {
                    setTargetAddress(account?.address || '')
                  }}
                >
                  My Address
                </Button>
              ),
            }}
            disabled={loading}
            value={targetAddress}
            size="small"
            onChange={(e) => {
              if (!e.target.validity.patternMismatch) {
                setTargetAddress(e.target.value)
              }
            }}
          />
          <Alert severity="warning" sx={{mt: 2}} icon={false}>
            You can only claim your rewards to the addresses on{' '}
            <b>Khala Network</b>. Do not claim to <b>Exchanges</b> or{' '}
            <b>Hardware wallets</b>.
          </Alert>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            variant="text"
            onClick={claim}
            disabled={!addressValid}
            loading={loading}
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ClaimMissingDelegatorRewards
