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
import useYesterday from '@/hooks/useYesterday'
import {aprToApy} from '@/lib/apr'
import {subsquidClient} from '@/lib/graphql'
import {
  useDelegationByIdQuery,
  type BasePoolCommonFragment,
} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import Settings from '@mui/icons-material/Settings'

import {
  Box,
  Button,
  Dialog,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {toCurrency, toPercentage} from '@phala/util'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {useCallback, useMemo, useState, type FC} from 'react'
import Withdraw from '../Delegation/Withdraw'
import Empty from '../Empty'
import PromiseButton from '../PromiseButton'
import DelegateInput from './DelegateInput'
import ExtraProperties from './ExtraProperties'
import Intro from './Intro'
import OwnerSettings from './OwnerSettings'
import WhitelistList from './Whitelist/List'
import WithdrawQueue from './WithdrawQueue'

type DetailPageDialogAction = 'withdraw' | 'ownerSettings'

const DetailPage: FC<{basePool: BasePoolCommonFragment}> = ({basePool}) => {
  const api = usePolkadotApi()
  const yesterday = useYesterday()
  const signAndSend = useSignAndSend()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogAction, setDialogAction] = useState<DetailPageDialogAction>()
  const [account] = useAtom(polkadotAccountAtom)
  const selectedVaultState = useSelectedVaultState()
  const {vault, stakePool, owner} = basePool
  const getApr = useGetApr()
  const theme = useTheme()
  const isVault = vault != null
  // const color = isVault ? 'secondary' : 'primary'
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
  const {data: delegationData, isLoading: isDelegationLoading} =
    useDelegationByIdQuery(
      subsquidClient,
      {
        id: `${basePool.id}-${
          selectedVaultState?.account.id ?? account?.address ?? ''
        }`,
        snapshotsWhere: {updatedTime_gte: yesterday},
      },
      {enabled: selectedVaultState != null || account !== null}
    )
  const onClose = useCallback(() => {
    setDialogOpen(false)
  }, [])
  const {delegationById: delegation} = delegationData ?? {}
  const hasDelegation = delegation != null && delegation.shares !== '0'
  const poolHasWithdrawal = basePool.withdrawingShares !== '0'

  const reclaim = async (): Promise<void> => {
    if (api == null) return
    await signAndSend(
      isVault
        ? api.tx.phalaVault.checkAndMaybeForceWithdraw(basePool.id)
        : api.tx.phalaStakePoolv2.checkAndMaybeForceWithdraw(basePool.id)
    )
  }

  const delegationProfit = useMemo(() => {
    let profit = new Decimal(0)
    const snapshot = delegation?.snapshots[0]
    if (delegation != null && snapshot != null) {
      profit = new Decimal(delegation.value)
        .minus(snapshot.value)
        .minus(delegation.cost)
        .plus(snapshot.cost)
      profit = Decimal.max(profit, 0)
    }
    return profit
  }, [delegation])

  return (
    <>
      <PageHeader
        title={`${basePool.kind} #${basePool.pid}`}
        pageTitle={basePool.kind}
      />
      <Stack spacing={{xs: 2, lg: 2.5}}>
        <Paper sx={{background: 'transparent'}} component="section">
          <Stack
            spacing={2}
            direction={{xs: 'column', lg: 'row'}}
            alignItems={{xs: 'flex-start', lg: 'center'}}
            sx={{p: {xs: 2, lg: 2.5}}}
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
                  <Property label="Est. APR" sx={{width: 64, flexShrink: '0'}}>
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
                  <Property label="Delegable" sx={{width: 140}}>
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
                  <Property label="TVL" sx={{width: 150}}>
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

        {/* <Paper
          component="section"
          sx={{
            p: {xs: 1, md: 2},
            pt: {xs: 0.5, md: 1},
            background: 'transparent',
          }}
        >
          <Tabs value="intergrated" indicatorColor={color} textColor={color}>
            <Tab label="Intergrated" value="intergrated" />
            <Tab label="Delegation" value="delegation" />
            <Tab label="Commission" value="commission" />
          </Tabs>
        </Paper> */}

        <Stack direction={{xs: 'column', lg: 'row'}} spacing={{xs: 2, lg: 2.5}}>
          <Paper
            component="section"
            sx={{
              p: {xs: 2, md: 3},
              pt: {xs: 1.5, md: 2},
              background: 'transparent',
              flex: {xs: 'none', lg: '1 0'},
              height: {xs: 300, lg: 'auto'},
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
          </Paper>
          <Paper
            component="section"
            sx={{
              position: 'relative',
              p: 2,
              background: 'transparent',
              flex: {xs: 'none', lg: '1 0'},
            }}
          >
            <Box position="absolute" right={16} top={16}>
              <DelegatorSelect isVault={isVault} />
            </Box>
            {hasDelegation ? (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-end"
              >
                <Box width="400px">
                  <NftCard
                    compact
                    delegation={delegation}
                    profit={delegationProfit}
                  />
                </Box>
                <Stack spacing={2}>
                  <PromiseButton
                    onClick={reclaim}
                    disabled={!poolHasWithdrawal}
                  >
                    Reclaim
                  </PromiseButton>
                  <Button
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
            <DelegateInput basePool={basePool} sx={{mt: 3}} />
          </Paper>
        </Stack>

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
