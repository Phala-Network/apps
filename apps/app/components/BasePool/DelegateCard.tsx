import StakePoolIcon from '@/assets/stake_pool_detailed.svg'
import VaultIcon from '@/assets/vault_detailed.svg'
import Property from '@/components/Property'
import useGetApr from '@/hooks/useGetApr'
import usePoolFavorite from '@/hooks/usePoolFavorite'
import useSelectedVaultState from '@/hooks/useSelectedVaultState'
import {aprToApy} from '@/lib/apr'
import getPoolPath from '@/lib/getPoolPath'
import type {BasePoolCommonFragment} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import {chainAtom} from '@/store/common'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Star from '@mui/icons-material/Star'
import StarBorder from '@mui/icons-material/StarBorder'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
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
import {polkadotAccountAtom} from '@phala/store'
import {useAtom} from 'jotai'
import type {FC} from 'react'
import BasePoolChart from './Chart'
import DelegateInput from './DelegateInput'
import ExtraProperties from './ExtraProperties'
import Identity from './Identity'
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
  const [chain] = useAtom(chainAtom)
  const delegatorAddress =
    selectedVaultState === null
      ? account?.address
      : selectedVaultState?.account.id
  const {vault, stakePool, owner} = basePool
  const [isFavorite, toggleFavorite] = usePoolFavorite(basePool.pid)

  const apr = getApr(basePool.aprMultiplier)
  const isClosed =
    basePool.whitelistEnabled &&
    basePool.owner.id !== account?.address &&
    basePool.whitelists.findIndex((x) => x.account.id === delegatorAddress) ===
      -1
  const hasDelegation =
    basePool.delegations.length > 0 && basePool.delegations[0].value !== '0'

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
          spacing={2}
          direction={{xs: 'column', md: 'row'}}
          alignItems={{xs: 'flex-start', md: 'center'}}
          flex={{xs: 1, md: 'none'}}
          pr={{xs: 2, md: 0}}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <IconButton
              size="small"
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
              <StakePoolIcon width={30} color={colors.main[300]} />
            )}
            {vault != null && (
              <VaultIcon width={30} color={colors.vault[400]} />
            )}
            <Stack width={{xs: 'auto', md: 150}} flex="1 0">
              <Link
                onClick={(e) => {
                  e.stopPropagation()
                }}
                color="inherit"
                lineHeight={1.3}
                variant="num3"
                href={getPoolPath(chain, basePool.kind, basePool.id)}
                target="_blank"
                rel="noopener"
                sx={{
                  textDecorationColor: alpha(theme.palette.text.primary, 0.4),
                }}
              >{`#${basePool.id}`}</Link>
              <Identity {...owner} />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2} display={{xs: 'none', md: 'flex'}}>
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
                wrapDecimal
              >
                {stakePool.delegable != null
                  ? `${toCurrency(stakePool.delegable)} PHA`
                  : '∞'}
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
              <Property
                label="TVL"
                sx={{width: 150}}
                wikiEntry="tvl"
                wrapDecimal
              >
                {`${toCurrency(basePool.totalValue)} PHA`}
              </Property>
            )}
            {hasDelegation && (
              <Property label="Delegated" sx={{width: 140}} wrapDecimal>
                {`${toCurrency(basePool.delegations[0].value)} PHA`}
              </Property>
            )}
          </Stack>
          <Stack spacing={1} display={{xs: 'flex', md: 'none'}} width={1}>
            {stakePool != null && (
              <Property
                size="small"
                fullWidth
                label="Est. APR"
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
                size="small"
                fullWidth
                label="Delegable"
                wikiEntry="delegable"
                wrapDecimal
              >
                {stakePool.delegable != null
                  ? `${toCurrency(stakePool.delegable)} PHA`
                  : '∞'}
              </Property>
            )}
            {vault != null && (
              <Property
                size="small"
                fullWidth
                label="Est. APY"
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
              <Property
                size="small"
                fullWidth
                label="TVL"
                wikiEntry="tvl"
                wrapDecimal
              >
                {`${toCurrency(basePool.totalValue)} PHA`}
              </Property>
            )}
            {hasDelegation && (
              <Property size="small" fullWidth label="Delegated" wrapDecimal>
                {`${toCurrency(basePool.delegations[0].value)} PHA`}
              </Property>
            )}
          </Stack>
          {isClosed && <Chip size="small" label="Closed" />}
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
              sx={{height: 120, overflow: 'auto', my: 1}}
            />
            <ExtraProperties basePool={basePool} />
          </Stack>
          <Stack flex="1 0">
            <Box
              flex={{xs: 'none', md: '1 0'}}
              height={{xs: 130, md: undefined}}
            >
              <BasePoolChart basePool={basePool} kind="apr" />
            </Box>
            <DelegateInput basePool={basePool} />
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}

export default DelegateCard
