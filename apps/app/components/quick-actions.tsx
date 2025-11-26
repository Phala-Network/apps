'use client'

import {
  AccountBalanceWallet,
  Route,
  Savings,
  SwapHoriz,
} from '@mui/icons-material'
import {Box, Grid, Paper, Stack, Typography} from '@mui/material'
import NextLink from 'next/link'
import type {FC} from 'react'

interface QuickAction {
  icon: React.ReactNode
  label: string
  description: string
  href: string
  external?: boolean
  color?: 'primary' | 'secondary'
}

const actions: QuickAction[] = [
  {
    icon: <Savings />,
    label: 'Stake PHA',
    description: 'Earn rewards by staking',
    href: '/staking',
    color: 'primary',
  },
  {
    icon: <Route />,
    label: 'Bridge',
    description: 'Transfer assets across chains',
    href: 'https://bridge.phala.network/',
    external: true,
  },
  {
    icon: <AccountBalanceWallet />,
    label: 'Claim Assets',
    description: 'Claim Phala/Khala assets',
    href: '/khala-assets',
    color: 'secondary',
  },
  {
    icon: <SwapHoriz />,
    label: 'Swap',
    description: 'Swap tokens on Uniswap',
    href: 'https://app.uniswap.org/swap?chain=mainnet&outputCurrency=0x6c5bA91642F10282b576d91922Ae6448C9d52f4E',
    external: true,
  },
]

const QuickActions: FC = () => {
  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={600} mb={2}>
        Quick Actions
      </Typography>
      <Grid container spacing={2}>
        {actions.map((action) => (
          <Grid key={action.label} size={{xs: 6, sm: 3}}>
            <Paper
              component={action.external ? 'a' : NextLink}
              href={action.href}
              target={action.external ? '_blank' : undefined}
              rel={action.external ? 'noopener noreferrer' : undefined}
              sx={(theme) => ({
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: 'transparent',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor:
                    action.color === 'secondary'
                      ? 'secondary.main'
                      : 'primary.main',
                  transform: 'translateY(-2px)',
                  background:
                    action.color === 'secondary'
                      ? `${theme.palette.secondary.main}10`
                      : `${theme.palette.primary.main}10`,
                },
              })}
            >
              <Stack spacing={1.5} alignItems="flex-start">
                <Box
                  sx={(theme) => ({
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor:
                      action.color === 'secondary'
                        ? `${theme.palette.secondary.main}20`
                        : `${theme.palette.primary.main}20`,
                    color:
                      action.color === 'secondary'
                        ? 'secondary.main'
                        : 'primary.main',
                  })}
                >
                  {action.icon}
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    color="text.primary"
                  >
                    {action.label}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{display: 'block', lineHeight: 1.3}}
                  >
                    {action.description}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default QuickActions
