import StakePoolIcon from '@/assets/stake_pool_detailed.svg'
import VaultIcon from '@/assets/vault_detailed.svg'
import Property from '@/components/Property'
import useGetApr from '@/hooks/useGetApr'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import {aprToApy} from '@/lib/apr'
import getPoolPath from '@/lib/getPoolPath'
import getVaultOwnerCut from '@/lib/getVaultOwnerCut'
import type {BasePoolCommonFragment} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import {chainAtom} from '@/store/common'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Settings from '@mui/icons-material/Settings'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  IconButton,
  Link,
  Skeleton,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material'
import {toCurrency, toPercentage} from '@phala/lib'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {type FC, useCallback, useMemo} from 'react'
import PromiseButton from '../PromiseButton'
import BasePoolChart from './Chart'
import ExtraProperties from './ExtraProperties'
import Intro from './Intro'
import type {OnAction} from './List'

const FarmCard: FC<{
  basePool: BasePoolCommonFragment
  onAction: OnAction
}> = ({basePool, onAction}) => {
  const api = usePolkadotApi()
  const signAndSend = useSignAndSend()
  const [chain] = useAtom(chainAtom)
  const getApr = useGetApr()
  const theme = useTheme()
  const {vault, stakePool} = basePool

  const vaultOwnerCut = useMemo(() => getVaultOwnerCut(basePool), [basePool])
  const vaultOwnerReward = useMemo(
    () =>
      basePool.vault != null
        ? new Decimal(basePool.sharePrice).times(
            basePool.vault.claimableOwnerShares,
          )
        : new Decimal(0),
    [basePool],
  )

  const mintCut = useCallback(async () => {
    if (api == null) return
    await signAndSend(api.tx.phalaVault.maybeGainOwnerShares(basePool.id))
  }, [api, signAndSend, basePool])

  const actions = (
    <Stack direction="row" alignItems="center">
      {stakePool != null && (
        <Button
          disabled={new Decimal(stakePool.ownerReward).lt('0.01')}
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
      {vault != null && (
        <PromiseButton
          color="secondary"
          disabled={vaultOwnerCut.lt('0.01')}
          variant="text"
          size="small"
          onClick={async (e) => {
            e.stopPropagation()
            await mintCut()
          }}
        >
          Mint Cut
        </PromiseButton>
      )}
      {vault != null && (
        <Button
          color="secondary"
          disabled={vaultOwnerReward.lt('0.01')}
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
    </Stack>
  )

  const apr = getApr(basePool.aprMultiplier)

  return (
    <Accordion
      square
      disableGutters
      slotProps={{
        transition: {mountOnEnter: true, unmountOnExit: true},
      }}
      sx={{
        '&:before': {display: 'none'},
        borderRadius: `${theme.shape.borderRadius}px`,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          background: colors.cardBackground,
          borderRadius: `${theme.shape.borderRadius - 1}px`,
        }}
      >
        <Stack
          spacing={3}
          direction={{xs: 'column', md: 'row'}}
          alignItems={{xs: 'flex-start', md: 'center'}}
          width={1}
          sx={{
            pl: {xs: 0, md: 1},
            py: {xs: 0, md: 0.5},
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            {stakePool != null && (
              <StakePoolIcon width={30} color={colors.main[300]} />
            )}
            {vault != null && (
              <VaultIcon width={30} color={colors.vault[400]} />
            )}
            <Box flex="1 0" width={108}>
              <Link
                onClick={(e) => {
                  e.stopPropagation()
                }}
                color="inherit"
                variant="num2"
                href={getPoolPath(chain, basePool.kind, basePool.id)}
                target="_blank"
                rel="noopener"
                sx={{
                  textDecorationColor: alpha(theme.palette.text.primary, 0.4),
                }}
              >{`#${basePool.id}`}</Link>
            </Box>
            <Box ml="auto" display={{xs: 'block', md: 'none'}}>
              {actions}
            </Box>
          </Stack>
          <Stack direction="row" spacing={2}>
            {stakePool != null && (
              <Property
                label="Est. APR"
                sx={{width: 80, flexShrink: '0'}}
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
              >
                {stakePool.delegable != null
                  ? `${toCurrency(stakePool.delegable)} PHA`
                  : '∞'}
              </Property>
            )}
            {stakePool != null && (
              <Property
                label="Owner Reward"
                sx={{width: 120}}
                wikiEntry="stakePoolOwnerRewards"
              >
                {`${toCurrency(stakePool.ownerReward)} PHA`}
              </Property>
            )}
            {vault != null && (
              <Property
                label="Est. APY"
                sx={{width: 80, flexShrink: '0'}}
                wikiEntry="estApr"
              >
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
              <Property label="TVL" sx={{width: 150}} wikiEntry="tvl">
                {`${toCurrency(basePool.totalValue)} PHA`}
              </Property>
            )}
            {vault != null && (
              <Property
                label="Owner Cut"
                sx={{width: 120}}
                wikiEntry="ownerCut"
              >
                {`${toCurrency(getVaultOwnerCut(basePool))} PHA`}
              </Property>
            )}
            {vault != null && (
              <Property
                label="Owner Reward"
                sx={{width: 150}}
                wikiEntry="vaultOwnerRewards"
              >
                {`${toCurrency(vaultOwnerReward)} PHA`}
              </Property>
            )}
          </Stack>
          <Stack flex="1 0" direction="row">
            {basePool.withdrawingShares !== '0' && (
              <Chip
                size="small"
                label="Withdrawal Queued"
                sx={{color: theme.palette.warning.dark}}
              />
            )}
          </Stack>
          <Box display={{xs: 'none', md: 'block'}}>{actions}</Box>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction={{xs: 'column', md: 'row'}} pt={1} spacing={3}>
          <Stack flex="1 0">
            <Typography variant="h6" lineHeight={1}>
              Announcement
            </Typography>
            <Intro
              basePool={basePool}
              variant="card"
              sx={{height: 100, overflow: 'auto', my: 1}}
            />
            <ExtraProperties basePool={basePool} />
          </Stack>
          <Stack flex="1 0">
            <Typography variant="h6" lineHeight={1}>
              Daily Owner Rewards
            </Typography>
            <Box
              mb={-2}
              mt={2}
              flex={{xs: 'none', md: '1 0'}}
              height={{xs: 130, md: undefined}}
            >
              <BasePoolChart basePool={basePool} kind="ownerRewards" />
            </Box>
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}

export default FarmCard
