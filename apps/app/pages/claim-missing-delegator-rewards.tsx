import Empty from '@/components/Empty'
import PageHeader from '@/components/PageHeader'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import {chainAtom} from '@/store/common'
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
import {toCurrency, validateAddress} from '@phala/utils'
import {type SubmittableExtrinsic} from '@polkadot/api/types'
import {type ISubmittableResult} from '@polkadot/types/types'
import {useQuery} from '@tanstack/react-query'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {type NextPage} from 'next'
import {useEffect, useMemo, useState} from 'react'

type Kind = 'legacy' | 'reimbursement'

interface Row {
  pid: string
  amount: Decimal
  claimed: boolean
  kind: Kind
}

const ClaimMissingDelegatorRewards: NextPage = () => {
  const [chain, setChain] = useAtom(chainAtom)
  const signAndSend = useSignAndSend()
  const [pid, setPid] = useState<string>()
  const [kind, setKind] = useState<Kind>()
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [targetAddress, setTargetAddress] = useState('')
  const onClose = (): void => {
    setDialogOpen(false)
  }
  const [account] = useAtom(polkadotAccountAtom)
  const [, setWalletDialogOpen] = useAtom(walletDialogOpenAtom)
  const [legacyRewardsList, setLegacyRewardsList] = useState<Row[]>()
  const [reimbursementsList, setReimbursementsList] = useState<Row[]>()
  const api = usePolkadotApi()
  const {data: legacyRewardsData} = useQuery(
    ['legacyRewards', account?.address, legacyRewardsList],
    async () => {
      if (
        account?.address != null &&
        api != null &&
        legacyRewardsList != null &&
        legacyRewardsList.length > 0
      ) {
        const result = legacyRewardsList
        const legacyRewards =
          await api.query.phalaStakePoolv2.legacyRewards.multi(
            legacyRewardsList.map((x) => [account.address, x.pid]),
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
      enabled:
        chain === 'khala' &&
        legacyRewardsList != null &&
        account?.address != null &&
        api != null,
      refetchInterval: 12000,
    },
  )

  const {data: reimbursementsData} = useQuery(
    ['vaultCheatReimbursements', account?.address, reimbursementsList],
    async () => {
      if (
        account?.address != null &&
        api != null &&
        reimbursementsList != null &&
        reimbursementsList.length > 0
      ) {
        const result = reimbursementsList
        const reimbursements =
          await api.query.phalaBasePool.reimbursements.multi(
            reimbursementsList.map((x) => [account.address, x.pid]),
          )
        for (let i = 0; i < reimbursements.length; i++) {
          if (reimbursements[i].isNone) {
            result[i].claimed = true
          }
        }
        return result
      }
      return []
    },
    {
      enabled:
        chain === 'khala' &&
        reimbursementsList != null &&
        account?.address != null &&
        api != null,
      refetchInterval: 12000,
    },
  )

  useEffect(() => {
    let unmounted = false
    void import('@/assets/legacyRewards.json').then((res) => {
      const legacyRewardsMap = res.default.legacyRewards
      if (
        !unmounted &&
        account?.address != null &&
        account.address in legacyRewardsMap
      ) {
        setLegacyRewardsList(
          res.default.legacyRewards[
            account.address as keyof typeof legacyRewardsMap
          ].map(([pid, amount]) => ({
            pid,
            amount: new Decimal(amount).div(1e12),
            claimed: false,
            kind: 'legacy',
          })),
        )
      } else {
        setLegacyRewardsList([])
      }
    })

    void import('@/assets/vault_cheat_reimbursements.json').then((res) => {
      const reimbursementsMap = res.default
      if (
        !unmounted &&
        account?.address != null &&
        account.address in reimbursementsMap
      ) {
        setReimbursementsList(
          res.default[account.address as keyof typeof reimbursementsMap].map(
            ([pid, amount]) => ({
              pid,
              amount: new Decimal(amount).div(1e12),
              claimed: false,
              kind: 'reimbursement',
            }),
          ),
        )
      } else {
        setReimbursementsList([])
      }
    })
    return () => {
      unmounted = true
    }
  }, [account?.address])

  const rowData = useMemo(() => {
    if (legacyRewardsData == null || reimbursementsData == null) return null
    return [...legacyRewardsData, ...reimbursementsData]
  }, [legacyRewardsData, reimbursementsData])

  const totalRewards = useMemo(() => {
    return rowData
      ?.filter((x) => !x.claimed)
      .reduce((acc, cur) => acc.add(cur.amount), new Decimal(0))
  }, [rowData])

  const addressValid = useMemo(
    () => validateAddress(targetAddress),
    [targetAddress],
  )

  const claim = async (): Promise<void> => {
    if (api == null || rowData == null) return
    const getExtrinsic = (
      pid: string,
      kind: Kind,
    ): SubmittableExtrinsic<'promise', ISubmittableResult> =>
      kind === 'legacy'
        ? api.tx.phalaStakePoolv2.claimLegacyRewards(pid, targetAddress)
        : api.tx.phalaBasePool.claimReimbursement(pid, targetAddress)
    const calls = []
    if (pid != null && kind != null) {
      calls.push(getExtrinsic(pid, kind))
    } else {
      calls.push(
        ...rowData
          .filter((x) => !x.claimed)
          .map(({pid, kind}) => getExtrinsic(pid, kind)),
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

  if (chain !== 'khala') {
    return (
      <Stack
        alignItems="center"
        pt={4}
        onClick={() => {
          setChain('khala')
        }}
      >
        <Button variant="contained">Switch to Khala</Button>
      </Stack>
    )
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

      {account !== null && (
        <Stack spacing={2} direction="row" alignItems="center" mt={4}>
          <Typography variant="h6" component="h2" color="text.secondary">
            Total Rewards
          </Typography>
          <Typography variant="num3">
            {totalRewards != null ? (
              `${toCurrency(totalRewards)} PHA`
            ) : (
              <Skeleton width={100} />
            )}
          </Typography>
          <Button
            size="small"
            disabled={totalRewards == null || totalRewards.eq(0)}
            onClick={() => {
              setTargetAddress('')
              setDialogOpen(true)
              setPid(undefined)
              setKind(undefined)
            }}
          >
            Claim All
          </Button>
        </Stack>
      )}

      {rowData != null && rowData.length === 0 && <Empty sx={{mt: 6}} />}

      {account !== null && legacyRewardsData == null && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="200px"
        >
          <CircularProgress />
        </Box>
      )}

      {account == null && (
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

      {rowData != null && rowData.length > 0 && (
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{mt: 3, background: 'transparent'}}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={200}>Date</TableCell>
                <TableCell width={200}>Vault/StakePool</TableCell>
                <TableCell>Rewards</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData.map((row) => (
                <TableRow
                  key={row.pid}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell component="th" scope="row">
                    <Typography variant="body1">
                      {row.kind === 'legacy' ? '2023-01-13' : '2023-11-28'}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography variant="body1">{`#${row.pid}`}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="num5">
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
                        setKind(row.kind)
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
              endAdornment: targetAddress === '' && (
                <Button
                  size="small"
                  variant="text"
                  sx={{flexShrink: 0}}
                  onClick={() => {
                    setTargetAddress(account?.address ?? '')
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
            onClick={() => {
              void claim()
            }}
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
