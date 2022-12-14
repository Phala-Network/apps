import Property from '@/components/Property'
import useGetApr from '@/hooks/useGetApr'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import aprToApy from '@/lib/aprToApy'
import getPoolPath from '@/lib/getPoolPath'
import {DelegationCommonFragment} from '@/lib/subsquidQuery'
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
import {FC} from 'react'
import PromiseButton from '../PromiseButton'
import {OnAction} from './List'

const HorizonCard: FC<{
  delegation: DelegationCommonFragment
  onAction: OnAction
  isOwner?: boolean
}> = ({delegation, onAction, isOwner = false}) => {
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
  const reclaim = async () => {
    if (!api) return
    return signAndSend(
      isVault
        ? api.tx.phalaVault.checkAndMaybeForceWithdraw(basePool.id)
        : api.tx.phalaStakePoolv2.checkAndMaybeForceWithdraw(basePool.id)
    )
  }

  // TODO: handle withdrawal nft
  if (!delegationNft) return null

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
          >{`${isVault ? 'Vault' : 'Stake Pool'} #${basePool.id}`}</Link>
        </Box>
        <Stack direction="row" spacing={{xs: 1, md: 2}}>
          <Property label="Value" sx={{width: 120}}>{`${toCurrency(
            value
          )} PHA`}</Property>
          {/* <Property label="7D Profit" sx={{width: 120}}>
            <Box
              component="span"
              color={theme.palette.success.main}
            >{`+ PHA`}</Box>
          </Property> */}
          <Property label={`Est. ${isVault ? 'APY' : 'APR'}`} sx={{width: 64}}>
            {apr ? (
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
