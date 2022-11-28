import StakePoolIcon from '@/assets/stake_pool_detailed.svg'
import VaultIcon from '@/assets/vault_detailed.svg'
import CollapsedIcon from '@/components/CollapsedIcon'
import DelegateInput from '@/components/DelegateInput'
import useGetApr from '@/hooks/useGetApr'
import usePoolFavorite from '@/hooks/usePoolFavorite'
import getApy from '@/lib/getApy'
import {IdentityLevel} from '@/lib/subsquid'
import {colors} from '@/lib/theme'
import {
  RemoveCircleOutline,
  Star,
  StarBorder,
  VerifiedOutlined,
} from '@mui/icons-material'
import {
  alpha,
  Box,
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
import {formatCurrency, trimAddress} from '@phala/util'
import {FC, useState} from 'react'
import {BasePoolQuery} from '.'
import ExtraProperties from './ExtraProperties'
import Property from './Property'

const DelegateCard: FC<{basePool: BasePoolQuery}> = ({basePool}) => {
  const getApr = useGetApr()
  const theme = useTheme()
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

  return (
    <Paper>
      <Stack
        spacing={3}
        onClick={() => setCollapsed((v) => !v)}
        direction={{xs: 'column', md: 'row'}}
        alignItems={{xs: 's', md: 'center'}}
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
          {stakePool && <StakePoolIcon width={48} color={colors.main[300]} />}
          {vault && <VaultIcon width={48} color={colors.vault[400]} />}
          <Box width={96} flex="1 0">
            <Link
              color="inherit"
              variant="num4"
              href={`/${stakePool ? 'stake-pool' : 'vault'}/${basePool.pid}`}
              target="_blank"
              rel="noopener"
              sx={{textDecorationColor: alpha(theme.palette.text.primary, 0.4)}}
            >{`#${basePool.id}`}</Link>
            <Stack direction="row" alignItems="center">
              <Tooltip
                title={owner.id}
                placement="top"
                PopperProps={{onClick: (e) => e.stopPropagation()}}
              >
                <Link
                  textOverflow="ellipsis"
                  overflow="hidden"
                  color={theme.palette.text.secondary}
                  variant="body2"
                  href={`https://khala.subscan.io/account/${owner.id}`}
                  target="_blank"
                  rel="noopener"
                >
                  {owner.identityDisplay || trimAddress(owner.id)}
                </Link>
              </Tooltip>
              {owner.identityDisplay && (
                <Tooltip
                  title={owner.identityLevel}
                  placement="top"
                  PopperProps={{onClick: (e) => e.stopPropagation()}}
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
          {stakePool && (
            <Property label="Est. APR" sx={{width: 64, flexShrink: '0'}}>
              {(
                <span css={{color: colors.main[300]}}>
                  {getApr(stakePool.aprMultiplier)}
                </span>
              ) || <Skeleton />}
            </Property>
          )}
          {stakePool && (
            <Property label="Delegable" sx={{width: 120}}>
              {stakePool.delegable
                ? `${formatCurrency(stakePool.delegable)} PHA`
                : '∞'}
            </Property>
          )}
          {vault && (
            <Property label="Est. APY" sx={{width: 64, flexShrink: '0'}}>
              {(
                <span css={{color: colors.vault[400]}}>
                  {getApy(vault.apr)}
                </span>
              ) || <Skeleton />}
            </Property>
          )}
          {vault && (
            <Property label="TVL" sx={{width: 120}}>
              {`${formatCurrency(basePool.totalValue)} PHA`}
            </Property>
          )}
          {vault && (
            <Property label="Owner Reward" sx={{width: 120}}>
              {` PHA`}
            </Property>
          )}
        </Stack>
        <Stack flex="1 0" direction="row"></Stack>
        <Box display={{xs: 'none', md: 'block'}}>{actions}</Box>
      </Stack>
      <Collapse in={!collapsed}>
        <Stack direction={{xs: 'column', md: 'row'}} p={2} spacing={3}>
          <Stack flex="1 0">
            <Box>
              <Typography variant="h6">Announcement</Typography>
              <Box minHeight={64}></Box>
            </Box>
            <ExtraProperties basePool={basePool} />
          </Stack>
          <Stack flex="1 0">
            <Box flex="1 0"></Box>
            <DelegateInput basePool={basePool} />
          </Stack>
        </Stack>
      </Collapse>
    </Paper>
  )
}

export default DelegateCard
