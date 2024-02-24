import NftsIcon from '@/assets/nfts.svg'
import StakePoolIcon from '@/assets/stake_pool_detailed.svg'
import VaultIcon from '@/assets/vault_detailed.svg'
import NftCard from '@/components/Delegation/NftCard'
import DelegatorSelect from '@/components/DelegatorSelect'
import PageHeader from '@/components/PageHeader'
import Property from '@/components/Property'
import useGetApr from '@/hooks/useGetApr'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSelectedVaultState from '@/hooks/useSelectedVaultState'
import useSignAndSend from '@/hooks/useSignAndSend'
import {aprToApy} from '@/lib/apr'
import {
  type BasePoolCommonFragment,
  useDelegationByIdQuery,
} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import {subsquidClientAtom} from '@/store/common'
import Settings from '@mui/icons-material/Settings'
import {TabContext, TabList, TabPanel} from '@mui/lab'
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Tab,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import {toCurrency, toPercentage} from '@phala/lib'
import {polkadotAccountAtom} from '@phala/store'
import {useAtom} from 'jotai'
import {type FC, useCallback, useMemo, useState} from 'react'
import DelegationChart from '../Delegation/Chart'
import Withdraw from '../Delegation/Withdraw'
import Empty from '../Empty'
import PromiseButton from '../PromiseButton'
import SectionHeader from '../SectionHeader'
import WikiButton from '../Wiki/Button'
import BasePoolChart, {type BasePoolChartKind} from './Chart'
import DelegateInput from './DelegateInput'
import ExtraProperties from './ExtraProperties'
import Intro from './Intro'
import OwnerSettings from './OwnerSettings'
import WhitelistList from './Whitelist/List'
import WithdrawQueue from './WithdrawQueue'

type DetailPageDialogAction = 'withdraw' | 'ownerSettings'

const DetailPage: FC<{basePool: BasePoolCommonFragment}> = ({basePool}) => {
  const api = usePolkadotApi()
  const [chartTab, setChartTab] = useState<BasePoolChartKind>('apr')
  const signAndSend = useSignAndSend()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogAction, setDialogAction] = useState<DetailPageDialogAction>()
  const [account] = useAtom(polkadotAccountAtom)
  const selectedVaultState = useSelectedVaultState()
  const {vault, stakePool, owner} = basePool
  const getApr = useGetApr()
  const theme = useTheme()
  const isVault = vault != null
  const color = isVault ? 'secondary' : 'primary'
  const isOwner = owner.id === account?.address

  const actions = (
    <>
      {isOwner && (
        <IconButton
          onClick={() => {
            setDialogOpen(true)
            setDialogAction('ownerSettings')
          }}
        >
          <Settings />
        </IconButton>
      )}
    </>
  )
  const apr = getApr(basePool.aprMultiplier)
  const [subsquidClient] = useAtom(subsquidClientAtom)
  const {data: delegation, isLoading: isDelegationLoading} =
    useDelegationByIdQuery(
      subsquidClient,
      {
        id: `${basePool.id}-${
          selectedVaultState?.account.id ?? account?.address ?? ''
        }`,
      },
      {
        enabled: selectedVaultState != null || account !== null,
        select: (data) => data.delegationById,
      },
    )
  const onClose = useCallback(() => {
    setDialogOpen(false)
  }, [])
  const hasDelegation = delegation != null && delegation.shares !== '0'
  const poolHasWithdrawal = basePool.withdrawingShares !== '0'

  const reclaim = async (): Promise<void> => {
    if (api == null) return
    await signAndSend(
      isVault
        ? api.tx.phalaVault.checkAndMaybeForceWithdraw(basePool.id)
        : api.tx.phalaStakePoolv2.checkAndMaybeForceWithdraw(basePool.id),
    )
  }

  const charts = useMemo<Array<[string, BasePoolChartKind]>>(() => {
    return [
      [isVault ? 'APY' : 'APR', 'apr'],
      [isVault ? 'TVL' : 'Delegation', 'totalValue'],
      ['Commission', 'commission'],
      ['Delegator', 'delegatorCount'],
      isVault ? ['StakePool', 'stakePoolCount'] : ['Worker', 'workerCount'],
    ]
  }, [isVault])

  return (
    <>
      <PageHeader
        title={`${basePool.kind} #${basePool.pid}`}
        pageTitle={basePool.kind}
      />
      <Stack spacing={2}>
        <Paper sx={{background: 'transparent'}} component="section">
          <Stack
            spacing={2}
            direction={{xs: 'column', lg: 'row'}}
            alignItems={{xs: 'flex-start', lg: 'center'}}
            sx={{px: 3, py: 2}}
          >
            <Stack
              flex="1 0"
              spacing={2}
              direction={{xs: 'column', sm: 'row'}}
              alignItems={{xs: 'flex-start', sm: 'center'}}
              width={{xs: 1, lg: 'initial'}}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                width={{xs: 1, sm: 'initial'}}
              >
                {stakePool != null && (
                  <StakePoolIcon width={48} color={colors.main[300]} />
                )}
                {vault != null && (
                  <VaultIcon width={48} color={colors.vault[400]} />
                )}
                <Box flex="1 0" width={108}>
                  <Tooltip title={basePool.account.id} placement="bottom-start">
                    <Typography
                      variant="num2"
                      sx={{
                        textDecoration: 'underline dotted',
                        textDecorationColor: theme.palette.text.secondary,
                      }}
                    >{`#${basePool.pid}`}</Typography>
                  </Tooltip>
                </Box>
                <Box display={{xs: 'block', sm: 'none'}}>{actions}</Box>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center" flex="1 0">
                {stakePool != null && (
                  <Property
                    label="Est. APR"
                    sx={{width: 64, flexShrink: '0'}}
                    wikiEntry="estApr"
                  >
                    {apr != null ? (
                      <Box component="span" color={colors.main[300]}>
                        {toPercentage(apr)}
                      </Box>
                    ) : (
                      <Skeleton width={32} />
                    )}
                  </Property>
                )}
                {stakePool != null && (
                  <Property
                    label="Delegable"
                    sx={{width: 140}}
                    wikiEntry="delegable"
                    wrapDecimal
                  >
                    {stakePool.delegable != null
                      ? `${toCurrency(stakePool.delegable)} PHA`
                      : '∞'}
                  </Property>
                )}
                {vault != null && (
                  <Property label="Est. APY" sx={{width: 64, flexShrink: '0'}}>
                    {apr != null ? (
                      <Box component="span" color={colors.vault[400]}>
                        {toPercentage(aprToApy(apr))}
                      </Box>
                    ) : (
                      <Skeleton width={32} />
                    )}
                  </Property>
                )}
                {vault != null && (
                  <Property label="TVL" sx={{width: 150}} wrapDecimal>
                    {`${toCurrency(basePool.totalValue)} PHA`}
                  </Property>
                )}
              </Stack>
              <Box ml="auto" display={{xs: 'none', sm: 'block', lg: 'none'}}>
                {actions}
              </Box>
            </Stack>
            <ExtraProperties
              basePool={basePool}
              sx={{width: {xs: 1, lg: 450}}}
            />
            <Box display={{xs: 'none', lg: 'block'}}>{actions}</Box>
          </Stack>
        </Paper>

        <Stack direction={{xs: 'column', lg: 'row'}} spacing={2}>
          <Paper
            component="section"
            sx={{
              flex: {xs: 'none', lg: '1'},
              minWidth: 0,
              background: 'transparent',
            }}
          >
            <Box
              sx={{
                mx: {xs: 2, md: 3},
                py: {xs: 1.5, md: 2},
                height: 280,
                minWidth: 0,
              }}
            >
              <Box position="relative" height="100%">
                <Intro
                  variant="detail"
                  basePool={basePool}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                />
              </Box>
            </Box>
          </Paper>
          <Paper
            component="section"
            sx={{
              flex: {xs: 'none', lg: '1'},
              background: 'transparent',
            }}
          >
            <Stack
              component="section"
              sx={{
                py: 1,
                mx: 1,
                height: 280,
              }}
            >
              <TabContext value={chartTab}>
                <TabList
                  indicatorColor={color}
                  textColor={color}
                  onChange={(_, newValue) => {
                    setChartTab(newValue as BasePoolChartKind)
                  }}
                >
                  {charts.map(([label, value]) => (
                    <Tab label={label} value={value} key={value} />
                  ))}
                </TabList>
                {charts.map(([, value]) => (
                  <TabPanel
                    value={value}
                    sx={{px: 0, pb: 0, flex: 1}}
                    key={value}
                  >
                    <BasePoolChart basePool={basePool} kind={value} />
                  </TabPanel>
                ))}
              </TabContext>
            </Stack>
          </Paper>
        </Stack>

        <Box component="section">
          <SectionHeader icon={<NftsIcon />} title="Delegate" />
          <Paper
            sx={{
              p: {xs: 2, md: 3},
              pt: {xs: 1.5, md: 2},
              background: 'transparent',
            }}
          >
            <Stack direction={{xs: 'column', lg: 'row'}} spacing={3}>
              <Box
                component="section"
                sx={{
                  minWidth: 0,
                  position: 'relative',
                  flex: {xs: 'none', lg: '1 0'},
                }}
              >
                <Box position="absolute" right={16} top={0}>
                  <DelegatorSelect isVault={isVault} />
                </Box>
                {hasDelegation ? (
                  <Stack
                    direction={{xs: 'column', lg: 'row'}}
                    justifyContent="space-between"
                    alignItems={{lg: 'flex-end'}}
                    mr={1}
                  >
                    <Box width="380px">
                      <NftCard compact delegation={delegation} />
                    </Box>
                    <Stack
                      spacing={2}
                      direction={{xs: 'row', lg: 'column'}}
                      mt={{xs: 2, lg: 0}}
                    >
                      <WikiButton entry="reclaimPool">
                        <PromiseButton
                          color={color}
                          onClick={reclaim}
                          disabled={!poolHasWithdrawal}
                        >
                          Reclaim
                        </PromiseButton>
                      </WikiButton>
                      <Button
                        color={color}
                        onClick={() => {
                          setDialogOpen(true)
                          setDialogAction('withdraw')
                        }}
                      >
                        Withdraw
                      </Button>
                    </Stack>
                  </Stack>
                ) : (
                  <Box height="240px">
                    {!isDelegationLoading && <Empty message="No Delegation" />}
                  </Box>
                )}
              </Box>
              <Stack flex={1} minWidth={0}>
                <Box flex={1}>
                  {delegation != null && (
                    <DelegationChart delegation={delegation} />
                  )}
                </Box>
                <DelegateInput basePool={basePool} sx={{mt: 1}} />
              </Stack>
            </Stack>
          </Paper>
        </Box>

        <Box component="section">
          <WithdrawQueue basePool={basePool} />
        </Box>
        <Box component="section">
          <WhitelistList basePool={basePool} />
        </Box>
      </Stack>

      <Dialog open={dialogOpen} onClose={onClose}>
        {dialogAction === 'ownerSettings' && (
          <OwnerSettings basePool={basePool} />
        )}
        {hasDelegation && dialogAction === 'withdraw' && (
          <Withdraw delegation={delegation} onClose={onClose} />
        )}
      </Dialog>
    </>
  )
}

export default DetailPage
