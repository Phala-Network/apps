'use client'

import {ArrowForward, OpenInNew} from '@mui/icons-material'
import {
  Box,
  Button,
  Chip,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import {toCurrency, trimAddress} from '@phala/lib'
import Image, {type StaticImageData} from 'next/image'
import NextLink from 'next/link'
import type {FC, ReactNode} from 'react'
import {formatUnits} from 'viem'

import {explorerUrl} from '@/config'

export interface AssetAction {
  label: string
  href: string
  external?: boolean
  variant?: 'text' | 'outlined' | 'contained'
  disabled?: boolean
}

interface AssetCardProps {
  icon: StaticImageData
  name: string
  symbol: string
  balance: bigint | null | undefined
  contractAddress?: string
  contractExplorerUrl?: string
  chainLabel?: string
  subValue?: ReactNode
  actions?: AssetAction[]
  highlight?: boolean
}

const AssetCard: FC<AssetCardProps> = ({
  icon,
  name,
  symbol,
  balance,
  contractAddress,
  contractExplorerUrl,
  chainLabel,
  subValue,
  actions = [],
  highlight = false,
}) => {
  const tokenExplorerUrl = contractExplorerUrl
    ? `${contractExplorerUrl}/token/${contractAddress}`
    : `${explorerUrl}/address/${contractAddress}`
  return (
    <Paper
      sx={(theme) => ({
        p: 2.5,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: highlight
          ? `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, transparent 50%)`
          : 'transparent',
        borderColor: highlight ? 'primary.main' : 'divider',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          background: highlight
            ? `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, transparent 50%)`
            : `${theme.palette.primary.main}08`,
        },
      })}
    >
      <Stack spacing={2} flex={1}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          minHeight={44}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{flexShrink: 0, width: 40, height: 40}}>
              <Image src={icon} width={40} height={40} alt={symbol} />
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight={600} lineHeight={1.3}>
                {name}
              </Typography>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  {symbol}
                </Typography>
                {chainLabel && (
                  <Chip
                    label={chainLabel}
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: '0.65rem',
                      bgcolor: 'action.selected',
                    }}
                  />
                )}
              </Stack>
            </Box>
          </Stack>

          <Box flexShrink={0}>
            {contractAddress && (
              <Chip
                size="small"
                variant="outlined"
                component="a"
                href={tokenExplorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                label={
                  <Box display="flex" alignItems="center" gap={0.5}>
                    {trimAddress(contractAddress)}
                    <OpenInNew sx={{width: 12, height: 12}} />
                  </Box>
                }
                sx={{
                  height: 22,
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  '&:hover': {borderColor: 'primary.main'},
                }}
              />
            )}
          </Box>
        </Stack>

        <Box flex={1}>
          {balance === undefined ? (
            <Skeleton variant="text" width={120} height={36} />
          ) : (
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{
                background: (theme) =>
                  highlight
                    ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
                    : 'inherit',
                backgroundClip: highlight ? 'text' : 'inherit',
                WebkitBackgroundClip: highlight ? 'text' : 'inherit',
                WebkitTextFillColor: highlight ? 'transparent' : 'inherit',
              }}
            >
              {balance != null ? toCurrency(formatUnits(balance, 18)) : '-'}
            </Typography>
          )}
          <Box minHeight={24} mt={0.5}>
            {subValue && (
              <Typography variant="body2" color="text.secondary">
                {subValue}
              </Typography>
            )}
          </Box>
        </Box>

        {actions.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
            mt="auto"
          >
            {actions.map((action) => (
              <Button
                key={action.label}
                size="small"
                variant={action.variant || 'outlined'}
                disabled={action.disabled}
                component={action.external ? 'a' : NextLink}
                href={action.href}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noopener noreferrer' : undefined}
                endIcon={
                  action.external ? (
                    <OpenInNew sx={{width: 14, height: 14}} />
                  ) : (
                    <ArrowForward sx={{width: 14, height: 14}} />
                  )
                }
                sx={{
                  fontSize: '0.75rem',
                  py: 0.5,
                  px: 1.5,
                }}
              >
                {action.label}
              </Button>
            ))}
          </Stack>
        )}
      </Stack>
    </Paper>
  )
}

export default AssetCard
