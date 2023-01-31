import Property from '@/components/Property'
import useGetApr from '@/hooks/useGetApr'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import {aprToApy} from '@/lib/apr'
import getPoolPath from '@/lib/getPoolPath'
import {type DelegationCommonFragment} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import Numbers from '@mui/icons-material/Numbers'
import {
  alpha,
  Box,
  Button,
  Chip,
  Link,
  Paper,
  Skeleton,
  Stack,
  useTheme,
} from '@mui/material'
import {toCurrency, toPercentage} from '@phala/util'
import type Decimal from 'decimal.js'
import {type FC} from 'react'
import PromiseButton from '../PromiseButton'
import {type OnAction} from './List'

const HorizonCard: FC<{
  delegation: DelegationCommonFragment
  onAction: OnAction
  isOwner?: boolean
  profit?: Decimal
}> = ({delegation, onAction, isOwner = false, profit}) => {
  const api = usePolkadotApi()
  const signAndSend = useSignAndSend()
  const {value, basePool, delegationNft, withdrawingValue} = delegation
  const isVault = basePool.kind === 'Vault'
  const color = isVault ? 'secondary' : 'primary'
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
        : api.tx.phalaStakePoolv2.checkAndMaybeForceWithdraw(basePool.id)
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
        py: 2,
        px: {xs: 2, md: 3},
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box width={140}>
          <Chip
            icon={<Numbers />}
            label={delegationNft.nftId}
            color={color}
            size="small"
          />
          <Link
            display="block"
            color="inherit"
            variant="subtitle1"
            target="_blank"
            rel="noopener"
            href={getPoolPath(basePool.kind, basePool.id)}
            fontWeight="500"
            mt={1}
            sx={{textDecorationColor: alpha(theme.palette.text.primary, 0.4)}}
          >{`${basePool.kind} #${basePool.id}`}</Link>
        </Box>
        <Stack direction="row" spacing={{xs: 1, md: 2}}>
          <Property label="Value" sx={{width: 120}}>{`${toCurrency(
            value
          )} PHA`}</Property>
          {profit != null && (
            <Property label="24h" sx={{width: 120}}>
              <Box
                component="span"
                color={
                  profit.gte(0.01)
                    ? theme.palette.success.main
                    : theme.palette.text.secondary
                }
              >{`+ ${toCurrency(profit)} PHA`}</Box>
            </Property>
          )}
          <Property label={`Est. ${isVault ? 'APY' : 'APR'}`} sx={{width: 64}}>
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
          <Property label="Pool free" sx={{width: 120}}>{`${toCurrency(
            delegation.basePool.freeValue
          )} PHA`}</Property>
          {hasWithdrawal && (
            <Property label="Withdrawing" sx={{width: 120}}>{`${toCurrency(
              withdrawingValue
            )} PHA`}</Property>
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
