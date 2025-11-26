import {Typography, type TypographyProps} from '@mui/material'
import type {FC} from 'react'

type ChainType = 'ethereum' | 'phala'

interface ChainBadgeProps extends Omit<TypographyProps, 'variant' | 'sx'> {
  chain: ChainType
}

const chainConfig: Record<ChainType, {label: string; color: string}> = {
  ethereum: {
    label: 'Ethereum',
    color: 'primary.main',
  },
  phala: {
    label: 'Phala Mainnet',
    color: 'secondary.main',
  },
}

const ChainBadge: FC<ChainBadgeProps> = ({chain, ...props}) => {
  const config = chainConfig[chain]

  return (
    <Typography
      variant="caption"
      sx={{
        border: 1,
        borderColor: config.color,
        color: config.color,
        px: 1,
        py: 0.25,
        borderRadius: 1,
      }}
      {...props}
    >
      {config.label}
    </Typography>
  )
}

export default ChainBadge
