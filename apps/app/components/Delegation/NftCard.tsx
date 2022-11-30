import Property from '@/components/Property'
import useGetApr from '@/hooks/useGetApr'
import aprToApy from '@/lib/aprToApy'
import getPoolPath from '@/lib/getPoolPath'
import {DelegationCommonFragment} from '@/lib/subsquidQuery'
import {colors} from '@/lib/theme'
import {
  alpha,
  Box,
  Chip,
  Link,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import {toCurrency, toPercentage} from '@phala/util'
import Decimal from 'decimal.js'
import {FC} from 'react'

const NftCard: FC<{delegation: DelegationCommonFragment}> = ({delegation}) => {
  const {value, shares, basePool, delegationNft} = delegation
  const isVault = basePool.kind === 'Vault'
  const color = isVault ? 'secondary' : 'primary'
  const theme = useTheme()
  const getApr = useGetApr()
  const apr = getApr(basePool.aprMultiplier)

  // TODO: handle withdrawal nft
  if (!delegationNft) return null

  return (
    <Paper
      sx={{
        height: 240,
        background: colors.cardBackground,
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <Box width={160} bgcolor="gray" flexShrink="0"></Box>
      <Stack flex="1" py={2} px={2.5}>
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
        <Typography variant="num3" mt={1}>
          {toCurrency(value)}
          <sub>PHA</sub>
        </Typography>
        <Typography variant="caption" color={theme.palette.success.main}>
          {`+1 PHA / 7d`}
        </Typography>

        <Stack spacing={0.5} mt="auto">
          <Property size="small" label={`Est. ${isVault ? 'APY' : 'APR'}`}>
            {apr ? (
              toPercentage(isVault ? aprToApy(apr) : apr)
            ) : (
              <Skeleton width={32} />
            )}
          </Property>
          <Property size="small" label="Shares">
            {toPercentage(new Decimal(shares).div(basePool.totalShares))}
          </Property>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default NftCard
