import Property from '@/components/Property'
import getPoolPath from '@/lib/getPoolPath'
import {BasePoolKind, DelegationCommonFragment} from '@/lib/subsquid'
import {colors} from '@/lib/theme'
import {alpha, Box, Chip, Link, Paper, Stack, useTheme} from '@mui/material'
import {toCurrency} from '@phala/util'
import {FC} from 'react'

const HorizonCard: FC<{delegation: DelegationCommonFragment}> = ({
  delegation,
}) => {
  const {value, basePool, delegationNft} = delegation
  const isVault = basePool.kind === BasePoolKind.Vault
  const color = isVault ? 'secondary' : 'primary'
  const theme = useTheme()

  // TODO: handle withdrawal nft
  if (!delegationNft) return null
  return (
    <Paper sx={{background: colors.cardBackground, p: 2}}>
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
        <Property label="Value" sx={{width: 120}}>{`${toCurrency(
          value
        )} PHA`}</Property>
        <Property label="7D Profit" sx={{width: 120}}>
          <Box
            component="span"
            color={theme.palette.success.main}
          >{`+1 PHA`}</Box>
        </Property>
        <Property label={`Est. ${isVault ? 'APY' : 'APR'}`} sx={{width: 120}}>
          <Box
            component="span"
            color={isVault ? colors.vault[400] : colors.main[300]}
          >{`+1 PHA`}</Box>
        </Property>
      </Stack>
    </Paper>
  )
}

export default HorizonCard
