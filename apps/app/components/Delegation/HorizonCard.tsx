import StakePoolIcon from '@/assets/stake_pool_detailed.svg'
import VaultIcon from '@/assets/vault_detailed.svg'
import Property from '@/components/Property'
import useDelegationOneDayProfit from '@/hooks/useDelegationOneDayProfit'
import useGetApr from '@/hooks/useGetApr'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import {aprToApy} from '@/lib/apr'
import getPoolPath from '@/lib/getPoolPath'
import type {DelegationCommonFragment} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import {chainAtom} from '@/store/common'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import {
  Box,
  Button,
  Chip,
  Link,
  Paper,
  Skeleton,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material'
import {toCurrency, toPercentage} from '@phala/lib'
import {useAtom} from 'jotai'
import type {FC} from 'react'
import Identity from '../BasePool/Identity'
import PromiseButton from '../PromiseButton'
import WrapDecimal from '../WrapDecimal'
import type {OnAction} from './List'

const HorizonCard: FC<{
  delegation: DelegationCommonFragment
  onAction: OnAction
  isOwner?: boolean
}> = ({delegation, onAction, isOwner = false}) => {
  const profit = useDelegationOneDayProfit(delegation.id)
  const api = usePolkadotApi()
  const signAndSend = useSignAndSend()
  const {value, basePool, withdrawingValue} = delegation
  const isVault = basePool.kind === 'Vault'
  const [chain] = useAtom(chainAtom)
  const theme = useTheme()
  const getApr = useGetApr()
  const apr = getApr(basePool.aprMultiplier)
  const hasWithdrawal = withdrawingValue !== '0'
  const poolHasWithdrawal = delegation.basePool.withdrawingShares !== '0'
  const reclaim = async (): Promise<void> => {
    if (api == null) return
    await signAndSend(
      isVault
        ? api.tx.phalaVault.checkAndMaybeForceWithdraw(basePool.id)
        : api.tx.phalaStakePoolv2.checkAndMaybeForceWithdraw(basePool.id),
    )
  }

  const actions = isOwner && (
    <Stack direction="row" alignItems="center">
      <Button
        size="small"
        variant="text"
        onClick={() => {
          onAction(delegation, 'withdraw')
        }}
      >
        Withdraw
      </Button>
      <PromiseButton
        size="small"
        variant="text"
        onClick={reclaim}
        disabled={!poolHasWithdrawal}
      >
        Reclaim
      </PromiseButton>
    </Stack>
  )

  return (
    <Paper
      sx={{
        background: colors.cardBackground,
        py: 1.5,
        px: 2,
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box flex="none" width={30} height={30}>
            {basePool.kind === 'StakePool' && (
              <StakePoolIcon color={colors.main[300]} />
            )}
            {basePool.kind === 'Vault' && (
              <VaultIcon color={colors.vault[400]} />
            )}
          </Box>
          <Stack flex="1 0" width={120}>
            <Link
              lineHeight={1.3}
              onClick={(e) => {
                e.stopPropagation()
              }}
              color="inherit"
              variant="num3"
              href={getPoolPath(chain, basePool.kind, basePool.id)}
              target="_blank"
              rel="noopener"
              sx={{
                textDecorationColor: alpha(theme.palette.text.primary, 0.4),
              }}
            >{`#${basePool.id}`}</Link>
            <Identity {...basePool.owner} />
          </Stack>
        </Stack>
        <Stack direction="row" spacing={{xs: 1, md: 2}} alignItems="center">
          <Property
            label="Value"
            sx={{width: 130}}
            wikiEntry="nftValue"
          >{`${toCurrency(value)} PHA`}</Property>
          {profit != null && (
            <Property label="1d" sx={{width: 100}} wikiEntry="oneDayRewards">
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
                  <WrapDecimal>{`${toCurrency(profit)} PHA`}</WrapDecimal>
                </Typography>
              </Stack>
            </Property>
          )}
          <Property
            label={`Est. ${isVault ? 'APY' : 'APR'}`}
            sx={{width: 80}}
            wikiEntry="estApr"
          >
            {apr != null ? (
              <Box
                component="span"
                color={isVault ? colors.vault[400] : colors.main[300]}
              >
                {toPercentage(isVault ? aprToApy(apr) : apr)}
              </Box>
            ) : (
              <Skeleton width={32} />
            )}
          </Property>
          <Property
            label="Pool free"
            sx={{width: 100}}
            wikiEntry="freeValue"
          >{`${toCurrency(delegation.basePool.freeValue)} PHA`}</Property>
          {hasWithdrawal && (
            <Property
              label="Withdrawing"
              sx={{width: 120}}
              wikiEntry="withdrawing"
            >{`${toCurrency(withdrawingValue)} PHA`}</Property>
          )}
        </Stack>

        <Stack flex="1" alignItems="flex-end" justifyContent="space-between">
          <Stack direction="row" height="24px">
            {hasWithdrawal && (
              <Chip
                label="Withdrawing"
                size="small"
                sx={{color: theme.palette.warning.dark}}
              />
            )}
          </Stack>
          {actions}
        </Stack>
      </Stack>
    </Paper>
  )
}

export default HorizonCard
