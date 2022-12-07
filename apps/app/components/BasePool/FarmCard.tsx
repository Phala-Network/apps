import StakePoolIcon from '@/assets/stake_pool_detailed.svg'
import VaultIcon from '@/assets/vault_detailed.svg'
import CollapsedIcon from '@/components/CollapsedIcon'
import Property from '@/components/Property'
import useGetApr from '@/hooks/useGetApr'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import aprToApy from '@/lib/aprToApy'
import getPoolPath from '@/lib/getPoolPath'
import getVaultOwnerCut from '@/lib/getVaultOwnerCut'
import {BasePoolCommonFragment} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import {Settings} from '@mui/icons-material'
import {
  alpha,
  Box,
  Button,
  Chip,
  Collapse,
  IconButton,
  Link,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import {toCurrency, toPercentage} from '@phala/util'
import Decimal from 'decimal.js'
import {FC, useCallback, useMemo, useState} from 'react'
import PromiseButton from '../PromiseButton'
import ExtraProperties from './ExtraProperties'
import {OnAction} from './List'

const FarmCard: FC<{
  basePool: BasePoolCommonFragment
  onAction: OnAction
}> = ({basePool, onAction}) => {
  const api = usePolkadotApi()
  const signAndSend = useSignAndSend()
  const getApr = useGetApr()
  const theme = useTheme()
  const [collapsed, setCollapsed] = useState(true)
  const {vault, stakePool} = basePool

  const vaultOwnerCut = useMemo(() => getVaultOwnerCut(basePool), [basePool])
  const vaultOwnerReward = useMemo(
    () =>
      basePool.vault
        ? new Decimal(basePool.sharePrice).times(
            basePool.vault.claimableOwnerShares
          )
        : new Decimal(0),
    [basePool]
  )

  const mintCut = useCallback(async () => {
    if (!api) return
    return signAndSend(api.tx.phalaVault.maybeGainOwnerShares(basePool.id))
  }, [api, signAndSend, basePool])

  const actions = (
    <Stack direction="row" alignItems="center">
      {stakePool && (
        <Button
          disabled={!stakePool || new Decimal(stakePool.ownerReward).lt('0.01')}
          variant="text"
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            onAction(basePool, 'claimReward')
          }}
        >
          Claim Reward
        </Button>
      )}
      {vault && (
        <PromiseButton
          disabled={!vault || vaultOwnerCut.lt('0.01')}
          variant="text"
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            return mintCut()
          }}
        >
          Mint Cut
        </PromiseButton>
      )}
      {vault && (
        <Button
          disabled={!vault || vaultOwnerReward.lt('0.01')}
          variant="text"
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            onAction(basePool, 'claimDelegation')
          }}
        >
          Claim to Delegation
        </Button>
      )}
      <IconButton
        onClick={(e) => {
          e.stopPropagation()
          onAction(basePool, 'ownerSettings')
        }}
      >
        <Settings />
      </IconButton>
      <CollapsedIcon collapsed={collapsed} />
    </Stack>
  )

  const apr = getApr(basePool.aprMultiplier)

  return (
    <Paper>
      <Stack
        spacing={3}
        onClick={() => setCollapsed((v) => !v)}
        direction={{xs: 'column', md: 'row'}}
        alignItems={{xs: 'flex-start', md: 'center'}}
        borderRadius={`${theme.shape.borderRadius - 1}px`}
        sx={{
          cursor: 'pointer',
          background: colors.cardBackground,
          pl: {xs: 2, md: 3},
          py: {xs: 2, md: 3},
          pr: 2,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          {stakePool && <StakePoolIcon width={48} color={colors.main[300]} />}
          {vault && <VaultIcon width={48} color={colors.vault[400]} />}
          <Box flex="1 0" width={108}>
            <Link
              onClick={(e) => e.stopPropagation()}
              color="inherit"
              variant="num2"
              href={getPoolPath(basePool.kind, basePool.id)}
              target="_blank"
              rel="noopener"
              sx={{textDecorationColor: alpha(theme.palette.text.primary, 0.4)}}
            >{`#${basePool.id}`}</Link>
          </Box>
          <Box ml="auto" display={{xs: 'block', md: 'none'}}>
            {actions}
          </Box>
        </Stack>
        <Stack direction="row" spacing={2}>
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
          {stakePool && (
            <Property label="Owner Reward" sx={{width: 120}}>
              {`${toCurrency(stakePool.ownerReward)} PHA`}
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
              {`${toCurrency(basePool.totalValue)} PHA`}
            </Property>
          )}
          {vault && (
            <Property label="Owner Cut" sx={{width: 120}}>
              {`${toCurrency(getVaultOwnerCut(basePool))} PHA`}
            </Property>
          )}
          {vault && (
            <Property label="Owner Reward" sx={{width: 150}}>
              {`${toCurrency(vaultOwnerReward)} PHA`}
            </Property>
          )}
        </Stack>
        <Stack flex="1 0" direction="row">
          {basePool.withdrawingShares !== '0' && (
            <Chip
              size="small"
              label="Insufficient Stake"
              sx={{color: theme.palette.warning.dark}}
            />
          )}
        </Stack>
        <Box display={{xs: 'none', md: 'block'}}>{actions}</Box>
      </Stack>
      <Collapse in={!collapsed}>
        <Stack direction={{xs: 'column', md: 'row'}} p={2}>
          <Stack flex="1 0">
            <Box>
              <Typography variant="h6">Announcement</Typography>
              <Box minHeight={64}></Box>
            </Box>
            <ExtraProperties basePool={basePool} />
          </Stack>
          <Box flex="1 0"></Box>
        </Stack>
      </Collapse>
    </Paper>
  )
}

export default FarmCard
