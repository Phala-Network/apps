import Empty from '@/components/Empty'
import PageHeader from '@/components/PageHeader'
import WrapDecimal from '@/components/WrapDecimal'
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
import {toCurrency, validateAddress} from '@phala/lib'
import {polkadotAccountAtom} from '@phala/store'
import type {SubmittableExtrinsic} from '@polkadot/api/types'
import type {ISubmittableResult} from '@polkadot/types/types'
import {useQuery} from '@tanstack/react-query'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import type {NextPage} from 'next'
import {useEffect, useMemo, useState} from 'react'

type Kind = 'legacy' | 'reimbursement'

interface Row {
  pid: string
  amount: Decimal
  claimed: boolean
  kind: Kind
}

const Subsidy: NextPage = () => {
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
  const {data: legacyRewardsData} = useQuery({
    queryKey: ['legacyRewards', account?.address, legacyRewardsList],
    queryFn: async () => {
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
    enabled:
      chain === 'khala' &&
      legacyRewardsList != null &&
      account?.address != null &&
      api != null,
    refetchInterval: 12000,
  })

  const {data: reimbursementsData} = useQuery({
    queryKey: [
      'vaultCheatReimbursements',
      account?.address,
      reimbursementsList,
    ],
    queryFn: async () => {
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
    enabled:
      chain === 'khala' &&
      reimbursementsList != null &&
      account?.address != null &&
      api != null,
    refetchInterval: 12000,
  })

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
      <PageHeader title="Claim Subsidies" />
      <Paper
        variant="outlined"
        sx={{p: 3, background: 'transparent', 'p + p': {mt: '1em'}}}
      >
        <Typography variant="body1">
          Hi Phamliy! This page is used to claim subsidies for on-chain issues
          related to staking. You can find information about past subsidy
          distribution events through the links below:
        </Typography>
        <Typography variant="body1">
          A.{' '}
          <Link
            href="https://forum.phala.network/t/bug-report-v2-delegation-claimable-rewards-error-30-12-2022/3817"
            target="_blank"
          >
            V2 delegation bug on 30/12/2022
          </Link>
        </Typography>
        <Typography variant="body1">
          B.{' '}
          <Link
            href="https://forum.phala.network/t/solution-for-the-vault-owner-misconduct/3922"
            target="_blank"
          >
            Vault commission issue on 07/06/2023
          </Link>
        </Typography>
        <Typography variant="body1">
          {
            'Funds can only be claimed once, and subsidies that have been claimed will be marked as "claimed".'
          }
        </Typography>
        <Typography variant="body1">
          Multisignature addresses cannot claim funds through this page. After
          checking the amount of rewards you should receive and the source PID
          from the reports above, please go to{' '}
          <Link
            href="https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkhala.api.onfinality.io%2Fpublic-ws#/extrinsics"
            target="_blank"
          >
            polkadot.js app
          </Link>{' '}
          to claim your rewards. Here is the{' '}
          <Link
            href="https://forum.phala.network/t/how-to-claim-subsidy-via-polkadot-js-app/3921"
            target="_blank"
          >
            tutorial
          </Link>{' '}
          for Multisig.
        </Typography>
      </Paper>

      {account !== null && (
        <Stack spacing={2} direction="row" alignItems="center" mt={4}>
          <Typography variant="h6" component="h2" color="text.secondary">
            Total Rewards
          </Typography>
          <Typography variant="num3">
            {totalRewards != null ? (
              <WrapDecimal>{`${toCurrency(totalRewards)} PHA`}</WrapDecimal>
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
                <TableCell />
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
                      {row.kind === 'legacy' ? '13/01/2023' : '28/11/2023'}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography variant="body1">{`#${row.pid}`}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="num5">
                      <WrapDecimal>
                        {`${toCurrency(row.amount)} PHA`}
                      </WrapDecimal>
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
        <DialogTitle>Claim Subsidies</DialogTitle>
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

export default Subsidy
