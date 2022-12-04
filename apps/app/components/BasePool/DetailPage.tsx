import StakePoolIcon from '@/assets/stake_pool_detailed.svg'
import VaultIcon from '@/assets/vault_detailed.svg'
import NftCard from '@/components/Delegation/NftCard'
import DelegatorSelect from '@/components/DelegatorSelect'
import PageHeader from '@/components/PageHeader'
import Property from '@/components/Property'
import useGetApr from '@/hooks/useGetApr'
import aprToApy from '@/lib/aprToApy'
import {subsquidClient} from '@/lib/graphql'
import {
  BasePoolCommonFragment,
  IdentityLevel,
  useDelegationByIdQuery,
} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import {
  RemoveCircleOutline,
  Settings,
  VerifiedOutlined,
} from '@mui/icons-material'
import {
  alpha,
  Box,
  Chip,
  IconButton,
  Link,
  Paper,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {toCurrency, toPercentage, trimAddress} from '@phala/util'
import {useAtom} from 'jotai'
import {FC} from 'react'
import DelegateInput from './DelegateInput'
import ExtraProperties from './ExtraProperties'
import WhitelistList from './Whitelist/List'
import WithdrawQueue from './WithdrawQueue'

const DetailPage: FC<{basePool: BasePoolCommonFragment}> = ({basePool}) => {
  const [account] = useAtom(polkadotAccountAtom)
  const {vault, stakePool, owner} = basePool
  const getApr = useGetApr()
  const theme = useTheme()
  const isVault = !!vault
  const color = isVault ? 'secondary' : 'primary'
  const isOwner = owner.id === account?.address

  const ownerVerified =
    owner.identityLevel === IdentityLevel.KnownGood ||
    owner.identityLevel === IdentityLevel.Reasonable
  const actions = (
    <>
      {isOwner && (
        <IconButton>
          <Settings />
        </IconButton>
      )}
    </>
  )
  const apr = getApr(basePool.aprMultiplier)
  const {data} = useDelegationByIdQuery(
    subsquidClient,
    {id: `${basePool.id}-${account?.address}`},
    {
      enabled: !!account,
    }
  )
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
                  {basePool?.withdrawalValue !== '0' && (
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
                sx={{width: {xs: 1, lg: 350}}}
              />
            )}
            <Box display={{xs: 'none', lg: 'block'}}>{actions}</Box>
          </Stack>
        </Paper>

        <Paper
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
        </Paper>

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
            <Stack>
              <Box maxWidth="375px">
                {data?.delegationById ? (
                  <NftCard compact delegation={data.delegationById} />
                ) : (
                  // TODO: placeholder style
                  <Box height="240px">No delegation</Box>
                )}
              </Box>
            </Stack>
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
    </>
  )
}

export default DetailPage
