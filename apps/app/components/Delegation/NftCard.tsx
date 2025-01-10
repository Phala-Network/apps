import StakePoolIcon from '@/assets/stake_pool_detailed.svg'
import VaultIcon from '@/assets/vault_detailed.svg'
import DelegationNftCover from '@/components/DelegationNftCover'
import Property from '@/components/Property'
import useDelegationOneDayProfit from '@/hooks/useDelegationOneDayProfit'
import useGetApr from '@/hooks/useGetApr'
import {aprToApy} from '@/lib/apr'
import getPoolPath from '@/lib/getPoolPath'
import type {DelegationCommonFragment} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import {
  Alert,
  Box,
  Link,
  Paper,
  Skeleton,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material'
import {toCurrency, toPercentage} from '@phala/lib'
import Decimal from 'decimal.js'
import type {FC} from 'react'
import Identity from '../BasePool/Identity'
import WrapDecimal from '../WrapDecimal'
import type {OnAction} from './List'
import DelegationMenu from './Menu'

const NftCard: FC<{
  compact?: boolean
  delegation: DelegationCommonFragment
  onAction?: OnAction
  isOwner?: boolean
}> = ({compact = false, delegation, onAction, isOwner = false}) => {
  const profit = useDelegationOneDayProfit(delegation.id)

  const {value, shares, basePool, delegationNft, withdrawingValue} = delegation
  const isVault = basePool.kind === 'Vault'
  const theme = useTheme()
  const getApr = useGetApr()
  const apr = getApr(basePool.aprMultiplier)
  const hasWithdrawal = withdrawingValue !== '0'

  return (
    <Paper
      sx={{
        height: 240,
        background: compact ? 'transparent' : colors.cardBackground,
        display: 'flex',
        overflow: 'hidden',
        ...(compact && {border: 'none'}),
      }}
    >
      <Box
        width={160}
        flexShrink="0"
        borderRadius="6px"
        overflow="hidden"
        position="relative"
      >
        <DelegationNftCover
          variant="delegation"
          delegation={delegation}
          nft={delegationNft}
        />
        {hasWithdrawal && (
          <Alert
            icon={false}
            variant="filled"
            severity="warning"
            sx={{
              borderRadius: 0,
              py: 0.5,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              '.MuiAlert-message': {p: 0},
            }}
          >
            Withdrawing
          </Alert>
        )}
      </Box>
      <Stack flex="1" py={compact ? 0 : 2} px={2.5} position="relative">
        {!compact && (
          <Stack direction="row" spacing={1} alignItems="center">
            <Box flex="none" width={40} height={40}>
              {basePool.kind === 'StakePool' && (
                <StakePoolIcon color={colors.main[300]} />
              )}
              {basePool.kind === 'Vault' && (
                <VaultIcon color={colors.vault[400]} />
              )}
            </Box>
            <Stack flex="1 0">
              <Link
                lineHeight={1.2}
                onClick={(e) => {
                  e.stopPropagation()
                }}
                color="inherit"
                variant="num3"
                href={getPoolPath(basePool.kind, basePool.id)}
                target="_blank"
                rel="noopener"
                sx={{
                  textDecorationColor: alpha(theme.palette.text.primary, 0.4),
                }}
              >{`#${basePool.id}`}</Link>
              <Identity {...basePool.owner} />
            </Stack>
          </Stack>
        )}
        <Typography variant="num2" mt={1}>
          <WrapDecimal>{toCurrency(value)}</WrapDecimal>
          <sub>PHA</sub>
        </Typography>
        {profit != null && (
          <Stack
            direction="row"
            alignItems="center"
            color={
              profit.gte(0.01)
                ? theme.palette.success.main
                : theme.palette.text.secondary
            }
          >
            <ArrowDropUpIcon
              sx={{mx: '-3px', transform: 'translate(0, 2px)'}}
            />

            <Typography variant="num5">
              <WrapDecimal>{`${toCurrency(profit)} PHA / 1d`}</WrapDecimal>
            </Typography>
          </Stack>
        )}

        <Stack mt="auto">
          {hasWithdrawal && (
            <Property
              size="small"
              label="Withdrawing"
              fullWidth
              wikiEntry="withdrawing"
            >
              {`${toCurrency(withdrawingValue)} PHA`}
            </Property>
          )}
          {!compact && (
            <Property
              size="small"
              label="Pool free"
              fullWidth
              wikiEntry="freeValue"
            >
              {`${toCurrency(
                Decimal.max(0, delegation.basePool.freeValue),
              )} PHA`}
            </Property>
          )}
          {!compact && (
            <Property
              size="small"
              label={`Est. ${isVault ? 'APY' : 'APR'}`}
              fullWidth
              wikiEntry="estApr"
            >
              {apr != null ? (
                toPercentage(isVault ? aprToApy(apr) : apr)
              ) : (
                <Skeleton width={32} />
              )}
            </Property>
          )}
          <Property size="small" label="Shares" fullWidth wikiEntry="shares">
            {toCurrency(shares)}
          </Property>
        </Stack>
        {!compact && isOwner && (
          <DelegationMenu
            delegation={delegation}
            onAction={onAction}
            sx={{position: 'absolute', top: 5, right: 5}}
          />
        )}
      </Stack>
    </Paper>
  )
}

export default NftCard
