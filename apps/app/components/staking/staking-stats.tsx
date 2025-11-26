'use client'

import {AccountBalance, Percent, SavingsOutlined} from '@mui/icons-material'
import {Box, Paper, Stack, Typography} from '@mui/material'
import {toCurrency, toPercentage} from '@phala/lib'
import Decimal from 'decimal.js'
import type {FC, ReactNode} from 'react'
import {formatUnits} from 'viem'

interface StatCardProps {
  icon: ReactNode
  label: string
  value: ReactNode
  unit?: string
  highlight?: boolean
}

const StatCard: FC<StatCardProps> = ({icon, label, value, unit, highlight}) => {
  return (
    <Paper
      sx={(theme) => ({
        p: {xs: 2, sm: 2.5},
        flex: 1,
        background: highlight
          ? `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.primary.main}05 100%)`
          : 'transparent',
        borderColor: highlight ? 'primary.main' : 'divider',
      })}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box
          sx={(theme) => ({
            width: 40,
            height: 40,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: highlight
              ? `${theme.palette.primary.main}20`
              : 'action.hover',
            color: highlight ? 'primary.main' : 'text.secondary',
            flexShrink: 0,
          })}
        >
          {icon}
        </Box>
        <Stack spacing={0.25}>
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight={500}
            fontSize="0.8rem"
          >
            {label}
          </Typography>
          <Stack direction="row" alignItems="baseline" spacing={0.5}>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={
                highlight
                  ? {
                      background: (theme) =>
                        `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }
                  : undefined
              }
            >
              {value}
            </Typography>
            {unit && (
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={500}
                fontSize="0.8rem"
              >
                {unit}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  )
}

interface StakingStatsProps {
  apr: Decimal | null
  myStaking: bigint | null
  totalStaking: bigint | null
}

const StakingStats: FC<StakingStatsProps> = ({
  apr,
  myStaking,
  totalStaking,
}) => {
  return (
    <Stack direction={{xs: 'column', md: 'row'}} spacing={{xs: 1.5, md: 2}}>
      <StatCard
        icon={<Percent sx={{width: 22, height: 22}} />}
        label="Current APR"
        value={apr != null ? toPercentage(apr) : '-'}
        highlight
      />

      <StatCard
        icon={<SavingsOutlined sx={{width: 22, height: 22}} />}
        label="Your Stake"
        value={myStaking != null ? toCurrency(formatUnits(myStaking, 18)) : '-'}
        unit="PHA"
      />

      <StatCard
        icon={<AccountBalance sx={{width: 22, height: 22}} />}
        label="Total Value Locked"
        value={
          totalStaking != null
            ? toCurrency(formatUnits(totalStaking, 18), 0)
            : '-'
        }
        unit="PHA"
      />
    </Stack>
  )
}

export default StakingStats
