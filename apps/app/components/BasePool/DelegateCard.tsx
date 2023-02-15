import StakePoolIcon from '@/assets/stake_pool_detailed.svg'
import VaultIcon from '@/assets/vault_detailed.svg'
import CollapsedIcon from '@/components/CollapsedIcon'
import Property from '@/components/Property'
import useGetApr from '@/hooks/useGetApr'
import usePoolFavorite from '@/hooks/usePoolFavorite'
import useSelectedVaultState from '@/hooks/useSelectedVaultState'
import {aprToApy} from '@/lib/apr'
import getPoolPath from '@/lib/getPoolPath'
import {IdentityLevel, type BasePoolCommonFragment} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline'
import Star from '@mui/icons-material/Star'
import StarBorder from '@mui/icons-material/StarBorder'
import VerifiedOutlined from '@mui/icons-material/VerifiedOutlined'
import {
  alpha,
  Box,
  Chip,
  Collapse,
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
import {useState, type FC} from 'react'
import BasePoolAprChart from './AprChart'
import DelegateInput from './DelegateInput'
import ExtraProperties from './ExtraProperties'
import Intro from './Intro'

const DelegateCard: FC<{
  basePool: BasePoolCommonFragment & {
    whitelists: Array<{account: {id: string}}>
    delegations: Array<{value: string}>
  }
}> = ({basePool}) => {
  const getApr = useGetApr()
  const theme = useTheme()
  const selectedVaultState = useSelectedVaultState()
  const [account] = useAtom(polkadotAccountAtom)
  const delegatorAddress =
    selectedVaultState === null
      ? account?.address
      : selectedVaultState?.account.id
  const [collapsed, setCollapsed] = useState(true)
  const {vault, stakePool, owner} = basePool
  const [isFavorite, toggleFavorite] = usePoolFavorite(basePool.pid)
  const ownerVerified =
    owner.identityLevel === IdentityLevel.KnownGood ||
    owner.identityLevel === IdentityLevel.Reasonable

  const actions = (
    <Stack direction="row" alignItems="center">
      <CollapsedIcon collapsed={collapsed} />
    </Stack>
  )
  const apr = getApr(basePool.aprMultiplier)
  const isClosed =
    basePool.whitelistEnabled &&
    basePool.owner.id !== account?.address &&
    basePool.whitelists.findIndex((x) => x.account.id === delegatorAddress) ===
      -1
  const hasDelegation =
    basePool.delegations.length > 0 && basePool.delegations[0].value !== '0'

  return (
    <Paper>
      <Stack
        spacing={3}
        onClick={() => {
          setCollapsed((v) => !v)
        }}
        direction={{xs: 'column', md: 'row'}}
        alignItems={{xs: 'flex-start', md: 'center'}}
        borderRadius={`${theme.shape.borderRadius - 1}px`}
        sx={{
          cursor: 'pointer',
          background: colors.cardBackground,
          pl: {xs: 1, md: 2},
          py: {xs: 2, md: 3},
          pr: 2,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton
            onClick={(e) => {
              e.stopPropagation()
              toggleFavorite()
            }}
          >
            {isFavorite ? (
              <Star color="warning" />
            ) : (
              <StarBorder color="disabled" />
            )}
          </IconButton>
          {stakePool != null && (
            <StakePoolIcon width={48} color={colors.main[300]} />
          )}
          {vault != null && <VaultIcon width={48} color={colors.vault[400]} />}
          <Box width={150} flex="1 0">
            <Link
              color="inherit"
              variant="num4"
              href={getPoolPath(basePool.kind, basePool.id)}
              target="_blank"
              rel="noopener"
              sx={{textDecorationColor: alpha(theme.palette.text.primary, 0.4)}}
            >{`#${basePool.id}`}</Link>
            <Stack direction="row" alignItems="center">
              <Tooltip
                title={owner.id}
                PopperProps={{
                  onClick: (e) => {
                    e.stopPropagation()
                  },
                }}
              >
                <Link
                  textOverflow="ellipsis"
                  overflow="hidden"
                  color="text.secondary"
                  variant="body2"
                  href={`https://khala.subscan.io/account/${owner.id}`}
                  target="_blank"
                  rel="noopener"
                  lineHeight="24px"
                  whiteSpace="nowrap"
                >
                  {owner.identityDisplay ?? trimAddress(owner.id)}
                </Link>
              </Tooltip>
              {owner.identityDisplay != null && (
                <Tooltip
                  title={owner.identityLevel ?? 'No Judgement'}
                  PopperProps={{
                    onClick: (e) => {
                      e.stopPropagation()
                    },
                  }}
                >
                  {ownerVerified ? (
                    <VerifiedOutlined
                      color="success"
                      sx={{width: 18, ml: 0.5, flexShrink: 0}}
                    />
                  ) : (
                    <RemoveCircleOutline
                      color="disabled"
                      sx={{width: 18, ml: 0.5, flexShrink: 0}}
                    />
                  )}
                </Tooltip>
              )}
            </Stack>
          </Box>
          <Box ml="auto" display={{xs: 'block', md: 'none'}}>
            {actions}
          </Box>
        </Stack>
        <Stack direction="row" spacing={2}>
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
          {hasDelegation && (
            <Property label="Delegated" sx={{width: 140}}>
              {`${toCurrency(basePool.delegations[0].value)} PHA`}
            </Property>
          )}
        </Stack>
        <Stack flex="1 0" direction="row">
          {isClosed && <Chip size="small" label="Closed" />}
        </Stack>
        <Box display={{xs: 'none', md: 'block'}}>{actions}</Box>
      </Stack>
      <Collapse in={!collapsed} mountOnEnter unmountOnExit>
        <Stack direction={{xs: 'column', md: 'row'}} p={2} spacing={3}>
          <Stack flex="1 0">
            <Typography variant="h6" lineHeight={1}>
              Announcement
            </Typography>
            <Intro
              basePool={basePool}
              variant="card"
              sx={{height: 120, overflow: 'auto', my: 1}}
            />
            <ExtraProperties basePool={basePool} />
          </Stack>
          <Stack flex="1 0">
            <Box flex="1 0">
              <BasePoolAprChart basePool={basePool} />
            </Box>
            <DelegateInput basePool={basePool} />
          </Stack>
        </Stack>
      </Collapse>
    </Paper>
  )
}

export default DelegateCard
