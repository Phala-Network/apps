import Property from '@/components/Property'
import useGetApr from '@/hooks/useGetApr'
import aprToApy from '@/lib/aprToApy'
import getPoolPath from '@/lib/getPoolPath'
import {DelegationCommonFragment} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
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
import {OnAction} from './List'

const HorizonCard: FC<{
  delegation: DelegationCommonFragment
  onAction: OnAction
}> = ({delegation, onAction}) => {
  const {value, basePool, delegationNft} = delegation
  const isVault = basePool.kind === 'Vault'
  const color = isVault ? 'secondary' : 'primary'
  const theme = useTheme()
  const getApr = useGetApr()
  const apr = getApr(basePool.aprMultiplier)

  // TODO: handle withdrawal nft
  if (!delegationNft) return null

  const actions = (
    <Stack direction="row" alignItems="center">
      <Button
        variant="text"
        onClick={() => {
          onAction(delegation, 'withdraw')
        }}
      >
        Withdraw
      </Button>
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
            label={`NO.${delegationNft.nftId}`}
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
          <Property label="7D Profit" sx={{width: 120}}>
            <Box
              component="span"
              color={theme.palette.success.main}
            >{`+ PHA`}</Box>
          </Property>
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
        </Stack>
        <Stack direction="row" flex="1"></Stack>
        {actions}
      </Stack>
    </Paper>
  )
}

export default HorizonCard
