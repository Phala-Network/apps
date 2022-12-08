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
import aprToApy from '@/lib/aprToApy'
import {subsquidClient} from '@/lib/graphql'
import {
  BasePoolCommonFragment,
  IdentityLevel,
  useDelegationByIdQuery,
} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline'
import Settings from '@mui/icons-material/Settings'
import VerifiedOutlined from '@mui/icons-material/VerifiedOutlined'

import {
  alpha,
  Box,
  Button,
  Chip,
  Dialog,
  IconButton,
  Link,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {toCurrency, toPercentage, trimAddress} from '@phala/util'
import {useAtom} from 'jotai'
import dynamic from 'next/dynamic'
import {FC, useCallback, useState} from 'react'
import Withdraw from '../Delegation/Withdraw'
import PromiseButton from '../PromiseButton'
import DelegateInput from './DelegateInput'
import ExtraProperties from './ExtraProperties'
import WhitelistList from './Whitelist/List'
import WithdrawQueue from './WithdrawQueue'

type DetailPageDialogAction = 'withdraw' | 'ownerSettings'

const OwnerSettings = dynamic(() => import('./OwnerSettings'), {
  ssr: false,
})

const DetailPage: FC<{basePool: BasePoolCommonFragment}> = ({basePool}) => {
  const api = usePolkadotApi()
  const signAndSend = useSignAndSend()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogAction, setDialogAction] = useState<DetailPageDialogAction>()
  const [account] = useAtom(polkadotAccountAtom)
  const selectedVaultState = useSelectedVaultState()
  const {vault, stakePool, owner} = basePool
  const getApr = useGetApr()
  const theme = useTheme()
  const isVault = !!vault
  // const color = isVault ? 'secondary' : 'primary'
  const isOwner = owner.id === account?.address

  const ownerVerified =
    owner.identityLevel === IdentityLevel.KnownGood ||
    owner.identityLevel === IdentityLevel.Reasonable
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
  const {data, isLoading: isDelegationLoading} = useDelegationByIdQuery(
    subsquidClient,
    {
      id: `${basePool.id}-${
        selectedVaultState?.account.id || account?.address
      }`,
    },
    {
      enabled: !!selectedVaultState || !!account,
    }
  )
  const onClose = useCallback(() => {
    setDialogOpen(false)
  }, [])
  const hasDelegation =
    !!data?.delegationById && data.delegationById.shares !== '0'
  const poolHasWithdrawal = basePool.withdrawingShares !== '0'

  const reclaim = async () => {
    if (!api) return
    return signAndSend(
      isVault
        ? api.tx.phalaVault.checkAndMaybeForceWithdraw(basePool.id)
        : api.tx.phalaStakePoolv2.checkAndMaybeForceWithdraw(basePool.id)
    )
  }

  return (
    <>
      <PageHeader
        title={`${isVault ? 'Vault' : 'Stake Pool'} #${basePool.pid}`}
        pageTitle={isVault ? 'Vault' : 'Stake Pool'}
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
                {stakePool && (
                  <StakePoolIcon width={48} color={colors.main[300]} />
                )}
                {vault && <VaultIcon width={48} color={colors.vault[400]} />}
                <Box flex="1 0" width={108}>
                  <Typography variant="num2">{`#${basePool.pid}`}</Typography>
                </Box>
                <Box display={{xs: 'block', sm: 'none'}}>{actions}</Box>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center" flex="1 0">
                {stakePool && (
                  <Property label="Est. APR" sx={{width: 64, flexShrink: '0'}}>
                    {apr ? (
                      <Box component="span" color={colors.main[300]}>
                        {toPercentage(apr)}
                      </Box>
                    ) : (
                      <Skeleton width={32} />
                    )}
                  </Property>
                )}
                {stakePool && (
                  <Property label="Delegable" sx={{width: 120}}>
                    {stakePool.delegable
                      ? `${toCurrency(stakePool.delegable)} PHA`
                      : '∞'}
                  </Property>
                )}
                {vault && (
                  <Property label="Est. APY" sx={{width: 64, flexShrink: '0'}}>
                    {apr ? (
                      <Box component="span" color={colors.vault[400]}>
                        {toPercentage(aprToApy(apr))}
                      </Box>
                    ) : (
                      <Skeleton width={32} />
                    )}
                  </Property>
                )}
                {vault && (
                  <Property label="TVL" sx={{width: 120}}>
                    {basePool && `${toCurrency(basePool.totalValue)} PHA`}
                  </Property>
                )}
                <Stack flex="1 0" direction="row">
                  {basePool?.withdrawingValue !== '0' && (
                    <Chip
                      size="small"
                      label="Insufficient Stake"
                      sx={{color: theme.palette.warning.dark}}
                    />
                  )}
                </Stack>
              </Stack>
              <Box ml="auto" display={{xs: 'none', sm: 'block', lg: 'none'}}>
                {actions}
              </Box>
            </Stack>
            {basePool && (
              <ExtraProperties
                basePool={basePool}
                sx={{width: {xs: 1, lg: 450}}}
              />
            )}
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
              flex: '1 0',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Link
                variant="h6"
                color="inherit"
                href={`https://khala.subscan.io/account/${owner?.id}`}
                target="_blank"
                rel="noopener"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                sx={{
                  textDecorationColor: alpha(theme.palette.text.primary, 0.4),
                }}
              >
                {owner.identityDisplay || trimAddress(owner.id)}
              </Link>

              {owner.identityDisplay && (
                <>
                  <Tooltip
                    title={owner.identityLevel ?? 'No Judgement'}
                    placement="top"
                  >
                    {ownerVerified ? (
                      <VerifiedOutlined
                        color="success"
                        sx={{width: 22, flexShrink: 0}}
                      />
                    ) : (
                      <RemoveCircleOutline
                        color="disabled"
                        sx={{width: 22, flexShrink: 0}}
                      />
                    )}
                  </Tooltip>
                  <Tooltip title={owner.id} placement="top">
                    <Typography
                      flexShrink="0"
                      variant="subtitle2"
                      component="div"
                      color="text.secondary"
                    >
                      {trimAddress(owner.id)}
                    </Typography>
                  </Tooltip>
                </>
              )}
            </Stack>
          </Paper>
          <Paper
            component="section"
            sx={{
              position: 'relative',
              p: 2,
              background: 'transparent',
              flex: '1 0',
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
                <Box maxWidth="375px">
                  <NftCard compact delegation={data.delegationById} />
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
              // TODO: placeholder style
              <Stack height="240px" alignItems="center" justifyContent="center">
                {!isDelegationLoading && 'No delegation'}
              </Stack>
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
          <Withdraw delegation={data.delegationById} onClose={onClose} />
        )}
      </Dialog>
    </>
  )
}

export default DetailPage
