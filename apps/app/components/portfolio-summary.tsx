'use client'

import {TrendingUp} from '@mui/icons-material'
import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import {toCurrency, toPercentage} from '@phala/lib'
import phaIcon from '@phala/ui/icons/asset/pha.png'
import vphaIcon from '@phala/ui/icons/asset/vpha.png'
import {useAppKit, useAppKitNetwork} from '@reown/appkit/react'
import Decimal from 'decimal.js'
import Image from 'next/image'
import type {FC} from 'react'
import {formatUnits} from 'viem'

import {ethChain} from '@/config'

interface PortfolioSummaryProps {
  totalPhaValue: bigint | null
  totalStakedVpha: bigint | null
  totalStakedInPha: bigint | null
  stakingApr: Decimal | null
  isConnected: boolean
}

const PortfolioSummary: FC<PortfolioSummaryProps> = ({
  totalPhaValue,
  totalStakedVpha,
  totalStakedInPha,
  stakingApr,
  isConnected,
}) => {
  const {open} = useAppKit()
  const {chainId, switchNetwork} = useAppKitNetwork()

  const isWrongNetwork = isConnected && chainId !== ethChain.id

  const showOverlay = !isConnected || isWrongNetwork

  return (
    <Paper
      sx={(theme) => ({
        p: 3,
        background: `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, transparent 50%, ${theme.palette.secondary.main}08 100%)`,
        borderColor: 'primary.main',
        position: 'relative',
        overflow: 'hidden',
      })}
    >
      {showOverlay && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backdropFilter: 'blur(4px)',
            bgcolor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack alignItems="center" spacing={1}>
            <Typography variant="body2" color="common.white">
              {isWrongNetwork
                ? 'Please switch to Ethereum Mainnet'
                : 'Connect wallet to view portfolio'}
            </Typography>
            <Button
              variant="contained"
              onClick={() =>
                isWrongNetwork ? switchNetwork(ethChain) : open()
              }
            >
              {isWrongNetwork ? 'Switch Network' : 'Connect Wallet'}
            </Button>
          </Stack>
        </Box>
      )}
      <Box
        sx={(theme) => ({
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.main}15 0%, transparent 70%)`,
        })}
      />

      <Stack
        direction={{xs: 'column', md: 'row'}}
        spacing={{xs: 3, md: 4}}
        position="relative"
        alignItems={{md: 'center'}}
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{display: {xs: 'none', md: 'block'}}}
          />
        }
      >
        <Box flex={1}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Total Portfolio Value
          </Typography>
          <Stack direction="row" alignItems="baseline" spacing={1}>
            <Typography
              variant="h3"
              fontWeight={700}
              sx={{
                background: (theme) =>
                  `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {totalPhaValue != null
                ? toCurrency(formatUnits(totalPhaValue, 18))
                : '-'}
            </Typography>
            <Typography variant="h5" color="text.secondary" fontWeight={500}>
              PHA
            </Typography>
          </Stack>
        </Box>

        <Box sx={{minWidth: {md: 220}}}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Total Staked
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Image src={vphaIcon} width={28} height={28} alt="vPHA" />
            <Typography variant="h5" fontWeight={600}>
              {totalStakedVpha != null
                ? toCurrency(formatUnits(totalStakedVpha, 18))
                : '-'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              vPHA
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
            <Typography variant="body2" color="text.secondary">
              {totalStakedInPha != null
                ? `≈ ${toCurrency(formatUnits(totalStakedInPha, 18))} PHA`
                : '-'}
            </Typography>
            {stakingApr != null && (
              <Chip
                icon={<TrendingUp sx={{width: 14, height: 14}} />}
                label={`${toPercentage(stakingApr)} APR`}
                color="primary"
                variant="outlined"
                size="small"
                sx={{
                  height: 22,
                  fontWeight: 600,
                  '& .MuiChip-icon': {color: 'primary.main'},
                }}
              />
            )}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  )
}

export default PortfolioSummary
